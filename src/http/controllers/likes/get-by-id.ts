import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function searchLikeByPostIdAndAuthotId(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const searchLikeBodySchema = z.object({
		authorId: z.string(),
		postId: z.string()
	});

	const { authorId, postId } = searchLikeBodySchema.parse(request.body);

	const like = await prisma.like.findFirst({
		where: {
			authorId: authorId, postId: postId
		 },
	});

	if(!like) {
		try {
			await prisma.like.create(
				{data: {
					authorId,
					postId,			
					like: false,
					dislike: false
				},}
			)
			return reply.status(200).send(like);

		} catch (error) {
			return reply.status(400).send({ error: "Erro ao registrar dislike" });
		}

	}

	return reply.status(200).send(like);
}
