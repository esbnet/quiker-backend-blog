import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";

interface ListQuerystring {
	page?: number;
	perPage?: number;
}

export async function list(
	request: FastifyRequest<{ Querystring: ListQuerystring }>,
	reply: FastifyReply,
) {
	const page = request.query.page || 1;
	const perPage = request.query.perPage || 10;
	const skip = (page - 1) * perPage;

	const [posts, total] = await Promise.all([
		prisma.post.findMany({
			include: {
				author: true,
			},
			skip,
			take: perPage,
		}),
		prisma.post.count(),
	]);

	return reply.send({
		data: posts,
		meta: {
			total,
			page,
			perPage,
			pageCount: Math.ceil(total / perPage),
		},
	});
}
