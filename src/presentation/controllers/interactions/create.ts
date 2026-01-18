import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/domain/errors/item-already-exists-error";
import { makeCreatePostUseCase } from "@/main/factories/post/make-create-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		title: z
			.string()
			.max(100, "O título deve ter no máximo 100 caracteres")
			.min(6, "O título deve ter no mínimo 6 caracteres"),
		content: z.string(),
		authorId: z.string(),
		views: z.number().default(0),
		likes: z.number().default(0),
		dontLike: z.number().default(0),
	});

	const {
		title,
		content,
		authorId,
		views = 0,
		likes = 0,
		dontLike = 0,
	} = createBodySchema.parse(request.body);

	try {
		const createUseCase = makeCreatePostUseCase();

		const { post } = await createUseCase.execute({
			title,
			content,
			authorId,
			views,
			likes,
			dontLike,
		});

		return reply.status(201).send(post);
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}
}
