import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function searchUserById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		email: z.string(),
	});

	const { email } = request.body as { email: string };

	console.log(request.body);

	const users = await prisma.user.findUnique({
		where: { email },
	});

	return reply.send(users);
}
