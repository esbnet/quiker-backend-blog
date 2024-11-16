import type { Prisma, User } from "@prisma/client";

export interface UsersRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(data: Prisma.UserCreateInput): Promise<User>;
	update(data: Prisma.UserUpdateInput): Promise<User>;
	delete(id: string): Promise<void>;
}