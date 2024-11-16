import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { CommentNotFoundError } from "@/use-cases/errors/comment-not-found-error";
import { z } from "zod";

export async function deleteComment(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		commentId: z.string(),
		authorId: z.string(),
	});

	const { commentId, authorId } = registerBodySchema.parse(request.body);

	const comment = await prisma.comment.findUnique({
		where: {
			id: commentId,
		},
	});

	if (!comment) {
		return reply.status(404).send({ error: "Comentário não encontrado." });
	}

	if (comment.authorId !== authorId) {
		return reply
			.status(401)
			.send({ error: "Apenas o autor pode deletar o comment." });
	}

	try {
		await prisma.comment.delete({
			where: { id: commentId },
		});
	} catch (error) {
		if (error instanceof CommentNotFoundError) {
			return reply.status(404).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply
		.status(200)
		.send(`Commentário "${comment.id}" deletado com sucesso!`);
}
