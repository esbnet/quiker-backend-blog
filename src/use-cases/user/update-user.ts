import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { UserNotFoundError } from "../errors/user-not-found-error";

interface UpdateProps {
	id: string;
	name: string;
	email: string;
	password: string;
}

interface UpdateUserResponse {
	user: User;
}

export class UpdateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
		name,
		email,
		password,
	}: UpdateProps): Promise<UpdateUserResponse> {
		const passwordHash = await bcryptjs.hash(password, 6);

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (!userWithSameEmail) {
			throw new UserNotFoundError();
		}

		const user = await this.usersRepository.update({
			id,
			name,
			email,
			passwordHash,
		});

		return { user };
	}
}
