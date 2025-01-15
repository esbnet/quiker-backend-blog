import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import request from "supertest";

describe("Posts (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("deveria poder se cadastrar", async () => {
		const response = await request(app.server).post("/post").send({
			title: "Meu Terceiro post",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(response.statusCode).toEqual(201);
	});

	it("view, likes e dontLike devem ser 0", async () => {
		const response = await request(app.server).post("/post").send({
			title: "Meu Terceiro post",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(response).toEqual(201);
	});
});
