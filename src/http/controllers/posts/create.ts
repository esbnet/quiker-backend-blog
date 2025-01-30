import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeCreatePostUseCase } from "@/use-cases/factories/post/make-create-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		authorId: z.string(),
		title: z
			.string()
			.max(100, "O título deve ter no máximo 100 caracteres")
			.min(6, "O título deve ter no mínimo 6 caracteres"),
		content: z.string(),
		imageUrl: z.string(),
		views: z.number().default(0),
		likes: z.number().default(0),
		dislikes: z.number().default(0),
	});

	const {
		authorId,
		title,
		content,
		imageUrl,
		views = 0,
		likes = 0,
		dislikes = 0,
	} = createBodySchema.parse(request.body);

	try {
		const createUseCase = makeCreatePostUseCase();

		const { post } = await createUseCase.execute({
			title,
			content,
			authorId,
			imageUrl,
			views,
			likes,
			dislikes,
		});

		return reply.status(201).send(post);
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}
}
