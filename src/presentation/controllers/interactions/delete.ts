import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";
import { PostNotFoundError } from "@/domain/errors/post-not-found-error";
import { z } from "zod";

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		postId: z.string(),
		authorId: z.string(),
	});

	const { postId, authorId } = registerBodySchema.parse(request.body);

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	if (!post) {
		return reply.status(404).send({ error: "Post not found" });
	}

	if (post.authorId !== authorId) {
		return reply
			.status(401)
			.send({ error: "Apenas o autor pode deletar o post." });
	}

	try {
		await prisma.post.delete({
			where: { id: postId },
		});
	} catch (error) {
		if (error instanceof PostNotFoundError) {
			return reply.status(404).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply
		.status(200)
		.send(`Usuário "${post.title}" deletado com sucesso!`);
}
