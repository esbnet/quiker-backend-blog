import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";

export async function listDislikes(request: FastifyRequest, reply: FastifyReply) {
	const likes = await prisma.like.findMany();

	return reply.send(likes);
}
