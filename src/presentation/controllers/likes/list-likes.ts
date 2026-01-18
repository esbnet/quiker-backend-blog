import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";

export async function listLikes(request: FastifyRequest, reply: FastifyReply) {
	const likes = await prisma.like.findMany();

	return reply.send(likes);
}
