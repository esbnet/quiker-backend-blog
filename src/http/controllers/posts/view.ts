import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

let count = 0;

export async function views(request: FastifyRequest, reply: FastifyReply) {
	const createBodySchema = z.object({
		id: z.string(),
	});

	count++

	const { id } = createBodySchema.parse(request.params);

	await console.log("VALOR ENVIADO DO FRONT",count)

	try {
		const post = await prisma.post.update({
			where: { id },
			data: { views: { increment: 1 } },
		});

		const postUpdate = await prisma.post.findUnique({
			where: { id },
		});
	
		return reply.send(postUpdate);
		// return reply.status(200).send("Visualização registrada com sucesso!");
	} catch (error) {
		return reply.status(400).send({ error: "Erro ao registrar visualização" });
	}
}
