import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
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

	if(hasLike && hasLike.like === like) { 
		return reply.status(200).send("Like está registrado para este usuário!");
	}

	try {
		// if existe dislike, decrement on post dislikesCount
		if(hasLike?.dislike) {
			await prisma.post.update({
				where: { id: postId },
				data: { dislikesCount: { decrement: 1 } },
			});	
		}

		// update likesCount for post on toggle like
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

		// update dislikeCount on post table
		await prisma.like.update({
			where: { id, authorId, postId },
			 data: { id, like, dislike: false },
		})
				
		return reply.status(200).send("Like registrado com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar dislike" });
	}

}
