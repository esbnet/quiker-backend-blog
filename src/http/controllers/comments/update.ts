import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeUpdateCommentUseCase } from "@/use-cases/factories/comment/make-update-post-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().uuid(),
		description: z.string(),
		userId: z.string(),
	});

	const { id, description, userId } = updateBodySchema.parse(request.body);

	const comment = await prisma.comment.findUnique({
		where: {
			id: userId,
		},
	});

	if (!comment) {
		return reply.status(404).send({ error: "Comentário não localizado" });
	}

	if (comment.authorId !== userId) {
		return reply
			.status(401)
			.send({ error: "Apenas o autor pode editat o comentário." });
	}

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
