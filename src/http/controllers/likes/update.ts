import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().cuid().optional(),
		authorId: z.string(),
		postId: z.string(),
		like: z.boolean(),
	});

	const { id, authorId, postId, like } = updateBodySchema.parse(request.body);

	const hasLike = await prisma.like.findUnique({
		where: { id, authorId, postId }
	})

	if(!hasLike){
		try {
			await prisma.like.create(
				{data: {
					authorId,
					postId,			
					like,
				},}
			)
		} catch (error) {
			return reply.status(400).send({ error: "Erro ao registrar dislike" });
		}
	}

	if(hasLike && hasLike.like === like) { 
		return reply.status(200).send("Like está registrado para este usuário!");
	}

	try {
		// update likecount on post table
		await prisma.like.update({
			where: { id, authorId, postId },
			 data: { id, like, dislike: false },
		})
		

		if(like) {
			await prisma.post.update({
				where: { id: postId },
				data: { likesCount: { increment: 1 } },
			});	
		} else {
			await prisma.post.update({
				where: { id: postId },
				data: { likesCount: { decrement: 1 } },
			});
	
		}
	
		return reply.status(200).send("Like registrado com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar dislike" });
	}

}
