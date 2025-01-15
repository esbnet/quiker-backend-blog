import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";

export async function report(request: FastifyRequest, reply: FastifyReply) {
	const posts = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			views: true,
			likesCount: true,
			dislikesCount: true,
		},
	});
	return reply.send(posts);
}
