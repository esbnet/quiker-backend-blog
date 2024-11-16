import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { AuthenticateUseCase } from "./authenticate";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUseCase(usersRepository);
	});

	it("should be able to authenticate", async () => {
		await usersRepository.create({
			name: "any_name",
			email: "any_emaildasd3@gmail.com",
			password_hash: await hash("any_password", 6),
		});

		const { user } = await sut.execute({
			email: "any_emaildasd3@gmail.com",
			password: "any_password",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate with wrong email", async () => {
		await expect(() =>
			sut.execute({
				email: "any_emaildasd3@gmail.com",
				password: "any_password",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate with wrong password", async () => {
		await usersRepository.create({
			name: "any_name",
			email: "any_emaildasd3@gmail.com",
			password_hash: await hash("any_password", 6),
		});

		await expect(() =>
			sut.execute({
				email: "any_emaildasd3@gmail.com",
				password: "any_password_wrong",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
