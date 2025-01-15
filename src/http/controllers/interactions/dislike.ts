import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function dislikes(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		id: z.string(),
	});

	const { id } = createBodySchema.parse(request.body);

	try {
		const post = await prisma.post.update({
			where: { id },
			data: { dislikes: { increment: 1 } },
		});
		return reply.status(200).send("Dislike registrada com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar dislike" });
	}
}
