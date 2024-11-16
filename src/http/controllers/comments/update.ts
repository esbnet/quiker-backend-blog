import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeUpdateCommentUseCase } from "@/use-cases/factories/comment/make-update-post-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().uuid(),
		description: z.string(),
	});

	const { id, description } = updateBodySchema.parse(request.body);

	try {
		const updateCommentUseCase = makeUpdateCommentUseCase();

		await updateCommentUseCase.execute({
			id,
			description,
		});
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply.status(200).send("Comentário atualizado com sucesso!");
}
