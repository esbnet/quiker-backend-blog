import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase; //  Subject Under Testing

describe("Get User Profile Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it("should be able to get user profile", async () => {
		const createdUser = await usersRepository.create({
			name: "any_name",
			email: "any_emaildasd3@gmail.com",
			passwordHash: await hash("any_password", 6),
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual("any_name");
	});

	it("should not be able to get user profile with wrong id", async () => {
		await expect(() =>
			sut.execute({
				userId: "not_a_valid_id",
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
