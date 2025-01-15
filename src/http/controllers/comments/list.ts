import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";

export async function list(request: FastifyRequest, reply: FastifyReply) {
	const comments = await prisma.comment.findMany({
		// where: {
		// 	removed: false,
		// },
	});

	return reply.send(comments);
}
