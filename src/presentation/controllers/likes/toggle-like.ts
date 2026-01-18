import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";
import { z } from "zod";

export async function toggleLike(request: FastifyRequest, reply: FastifyReply) {
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

	if(hasLike && hasLike.like === like) { 
		return reply.status(200).send("Like está registrado para este usuário!");
	}

	if(!hasLike){
		try {
			await prisma.like.create(
				{data: {
					authorId,
					postId,			
					like,
					dislike: false
				},}
			)
		} catch (error) {
			return reply.status(400).send({ error: "Erro ao registrar dislike" });
		}
	}


	// update post table, likes and dislikes fields
	try {
		// if existe dislike, decrement on post dislikes
		if(hasLike?.dislike) {
			await prisma.post.update({
				where: { id: postId },
				data: { dislikes: { decrement: 1 } },
			});	
		}

		// update likes for post when toggle on like
		if(like) {
			await prisma.post.update({
				where: { id: postId },
				data: { likes: { increment: 1 } },
			});	
		} else {
			await prisma.post.update({
				where: { id: postId },
				data: { likes: { decrement: 1 } },
			});
	
		}

		// update like field on like table
		await prisma.like.update({
			where: { id, authorId, postId },
			 data: { id, like, dislike: false },
		})
				
		return reply.status(200).send("Like registrado com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar dislike" });
	}

}
