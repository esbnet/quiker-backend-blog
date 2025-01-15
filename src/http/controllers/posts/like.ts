import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function likes(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		id: z.string(),
		authorId: z.string(),
	});

	const { id } = createBodySchema.parse(request.body);

	// Verificar se o usuário já deu dislike
	const post = await prisma.post.findUnique({
		where: { id },
	});

	try {
		const post = await prisma.post.update({
			where: { id },
			data: { likesCount: { increment: 1 } },
		});

		return reply.status(200).send("Like registrada com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar like" });
	}
}
