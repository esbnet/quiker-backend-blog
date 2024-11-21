import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function getPostById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getPostByIdBodySchema = z.object({
		id: z.string(),
	});

	const { id } = getPostByIdBodySchema.parse(request.body);

	console.log("==========> parametro que chegou no servidor", id)

	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
			comments: true,			
		}
	});

	return reply.send(post);
}
