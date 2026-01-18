import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";
import { z } from "zod";

export async function getCommentsByPostId(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const searchByIdBodySchema = z.object({
		id: z.string().cuid(),
	});

	const { id } = searchByIdBodySchema.parse(request.body);

	
	const comment = await prisma.comment.findMany({
		where: { postId: id },
		include: {
			user: true
		}
	});

	return reply.send(comment);
}
