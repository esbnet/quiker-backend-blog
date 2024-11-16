import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new RegisterUseCase(usersRepository);
	});

	it("should be able to register", async () => {
		const UsersRepository = new RegisterUseCase(new InMemoryUsersRepository());

		const { user } = await UsersRepository.execute({
			name: "any_name",
			email: "any_emaildasd3@gmail.com",
			password: "any_password",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should hash user password upon registration", async () => {
		const { user } = await sut.execute({
			name: "any_name",
			email: "any_email13@gmail.com",
			password: "any_password",
		});

		const isPasswordHashed = await compare("any_password", user.passwordHash);
		expect(isPasswordHashed).toBe(true);
	});

	it("should not be able to register user with same email twice", async () => {
		const email = "any_email@gmail.com";

		await sut.execute({
			name: "any_name",
			email,
			password: "any_password",
		});

		await expect(() =>
			sut.execute({
				name: "any_name",
				email,
				password: "any_password",
			}),
		).rejects.toBeInstanceOf(ItemAlreadyExistsError);
	});
});
