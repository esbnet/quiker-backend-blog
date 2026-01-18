import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/infrastructure/database/prisma";
import { z } from "zod";

export async function getPostById(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const getPostByIdBodySchema = z.object({
		id: z.string(),
	});

	const { id } = getPostByIdBodySchema.parse(request.body);

	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
			comments: {
				include: {
					author: {
						select: {
							"id": true,
                			"name": true,
						}
					}									
				}
			}
		},
	});

	return reply.send(post);
}
