import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import request from "supertest";

describe("Register (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to register", async () => {
		const response = await request(app.server).post("/users").send({
			title: "any_name",
			content: "esbnet@hotmail.com",
			imageUrl: "123123",
		});

		const newUser = await request(app.server).get("/users").send({
			email: "esbnet@hotmail.com",
		});

		const updateResponse = await request(app.server).put("/users/1").send({
			name: "other_name",
			email: "esbnet@hotmail.com",
			password: "123123",
		});

		expect(response.statusCode).toEqual(201);
	});
});
