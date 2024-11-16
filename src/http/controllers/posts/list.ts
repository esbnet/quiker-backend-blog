import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";

export async function list(request: FastifyRequest, reply: FastifyReply) {
	const posts = await prisma.post.findMany();

	return reply.send(posts);
}
