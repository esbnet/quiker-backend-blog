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

	const post = await prisma.post.findUnique({
		where: {
			id: comment.postId,
		},
	});

	if (!post) {
		return reply
			.status(404)
			.send({ error: "Postagem do comentário não existe." });
	}

	// Se o comentário ou a postagem pertencerem ao autor
	if (comment.authorId !== authorId || post.authorId !== authorId) {
		return reply.status(401).send({
			error:
				"Apenas o autor do post e do comentário podem deletar o commentário",
		});
	}

	try {
		await prisma.comment.update({
			where: {
				id: commentId,
			},
			data: {
				removed: true,
			},
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
