import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";

export async function list(request: FastifyRequest, reply: FastifyReply) {
	const comments = await prisma.comment.findMany({
		include: {
			user: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return reply.send(comments);
}
