import { $Enums, type Prisma, type User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	update(data: Prisma.UserUpdateInput): Promise<User> {
		throw new Error("Method not implemented."); // TODO
	}

	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);
		if (!user) {
			return null;
		}
		return user;
	}

	public items: User[] = [];

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);
		if (!user) {
			return null;
		}
		return user;
	}

	type = $Enums.Role;

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			role: $Enums.Role.MEMBER,
			createdAt: new Date(),
		};

		this.items.push(user);

		return user;
	}
}
