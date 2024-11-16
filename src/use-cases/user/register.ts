import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error";

interface RegisterProps {
	name: string;
	email: string;
	password: string;
}

interface RegisterUserResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: RegisterProps): Promise<RegisterUserResponse> {
		const password_hash = await bcryptjs.hash(password, 6);

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new ItemAlreadyExistsError();
		}

		const user = await this.usersRepository.create({
			name,
			email,
			passwordHash: password_hash,
		});

		return { user };
	}
}
