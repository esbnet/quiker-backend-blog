import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeUpdatePostUseCase } from "@/use-cases/factories/post/make-update-post-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().uuid(),
		title: z
			.string()
			.max(100, "O título deve ter no máximo 100 caracteres")
			.min(6, "O título deve ter no mínimo 6 caracteres"),
		description: z.string(),
		imageUrl: z.string().default(""),
		userId: z.string(),
	});

	const { id, title, description, imageUrl, userId } = updateBodySchema.parse(
		request.body,
	);

	const post = await prisma.post.findUnique({
		where: {
			id,
		},
	});

	if (!post) {
		return reply.status(404).send({ error: "Post not found" });
	}

	if (post.authorId !== userId) {
		return reply
			.status(401)
			.send({ error: "Apenas o autor pode deletar o post." });
	}

	try {
		const updatePostUseCase = makeUpdatePostUseCase();

		await updatePostUseCase.execute({
			id,
			title,
			description,
			imageUrl,
		});
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply.status(200).send("Post atualizado com sucesso!");
}
