import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeCreateCommentUseCase } from "@/use-cases/factories/comment/make-create-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		authorId: z.string(),
		postId: z.string(),
		content: z.string(),
	});

	const { authorId, postId, content } = createBodySchema.parse(
		request.body,
	);

	try {
		const createUseCase = makeCreateCommentUseCase();

		const { comment } = await createUseCase.execute({
			authorId,
			postId,
			content,
		});
		return reply.status(201).send(comment);
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}
}
