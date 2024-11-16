import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
	app: FastifyInstance,
	isAdmin = false,
) {
	await prisma.user.create({
		data: {
			name: "Admin User",
			email: "admin_user@hotmail.com",
			password_hash: await hash("123123", 6),
			role: isAdmin ? "ADMIN" : "MEMBER",
		},
	});

	const authResonse = await request(app.server).post("/sessions").send({
		email: "admin_user@hotmail.com",
		password: "123123",
	});

	const { token } = authResonse.body;

	return { token };
}
