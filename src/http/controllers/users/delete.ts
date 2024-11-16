import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { UserNotFoundError } from "@/use-cases/errors/user-not-found-error";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		email: z.string().email(),
	});

	console.log(request.body);

	const { email } = registerBodySchema.parse(request.body);

	const user = await prisma.user.findUnique({
		where: { email },
	});

	console.log("USUÁRIO ENCONTRADO NO BANCO:  ", user);

	if (!user) {
		return reply.status(404).send({ error: "User not found" });
	}

	try {
		await prisma.user.delete({
			where: { email: user.email },
		});
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			return reply.status(404).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply.status(200).send(`Usuário ${email} deletado com sucesso!`);
}
