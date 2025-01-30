import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function toggleDislike(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().cuid().optional(),
		authorId: z.string(),
		postId: z.string(),
		dislike: z.boolean(),
	});

	const { id, authorId, postId, dislike } = updateBodySchema.parse(request.body);

	const hasDislike = await prisma.like.findUnique({
		where: { id, authorId, postId }
	})
	
	// create like registre if not exist
	if(!hasDislike){
		try {
			await prisma.like.create(
				{data: {
					authorId,
					postId,
					like: false,
					dislike,
				},}
			)
		} catch (error) {
			return reply.status(400).send({ error: "Erro ao registrar dislike" });
		}
	}

	if(hasDislike && hasDislike.dislike === dislike) { 
		return reply.status(200).send("Dislike já está registrado pelo usuário!");
	}

	try {
		// if existe like, decrement on post likes
		if(hasDislike?.like) {
			await prisma.post.update({
				where: { id: postId },
				data: { likes: { decrement: 1 } },
			});	
		}

		// update dislikes for post on toggle dislike
		if(dislike) {
			await prisma.post.update({
				where: { id: postId },
				data: { 
					dislikes: { increment: 1 } 
				},
			});	
		} else {
			await prisma.post.update({
				where: { id: postId },
				data: { dislikes: { decrement: 1 } },
			});
		}

		// update dislikeCount on post table
		await prisma.like.update({
			where: { id, authorId, postId },
			 data: { id, like: false, dislike },
		})		

		return reply.status(200).send("Dislike registrado com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar dislike" });
	}

}
