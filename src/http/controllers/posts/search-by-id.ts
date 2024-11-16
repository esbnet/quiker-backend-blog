import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function searchPostById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		id: z.string(),
	});

	const { id } = request.body as { id: string };

	const post = await prisma.post.findUnique({
		where: { id },
	});

	return reply.send(post);
}
