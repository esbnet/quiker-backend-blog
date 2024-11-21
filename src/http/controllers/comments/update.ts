import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().cuid(),
		removed: z.boolean()
	});

	const { id, removed } = updateBodySchema.parse(request.body);

	const data = {
		removed
	}

	const comment = await prisma.comment.update({
		where: {
			id: id,
		},
		data		

	});

	return reply.status(200).send("Comentário deletado!");
}
