import type { Prisma, User } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

	async create(data: Prisma.UserCreateInput) {
		const user = prisma.user.create({ data });

		return user;
	}

	async delete(id: string) {
		const user = prisma.user.delete({
			where: { id },
		});
	}

	async update(data: Prisma.UserCreateInput): Promise<User> {
		const user = prisma.user.update({
			where: { id: data.id },
			data,
		});

		return user.then((user) => {
			return user;
		});
	}

	async findById(userId: string) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		return user;
	}

}
