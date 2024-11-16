import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function searchCommentById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const searchByIdBodySchema = z.object({
		id: z.string(),
	});

	const { id } = searchByIdBodySchema.parse(request.body);

	const comment = await prisma.comment.findUnique({
		where: { id },
	});

	return reply.send(comment);
}
