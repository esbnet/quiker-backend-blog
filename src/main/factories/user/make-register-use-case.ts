import { PrismaUsersRepository } from "@/infrastructure/database/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/application/use-cases/user/register";

export function makeRegisterUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const registerUseCase = new RegisterUseCase(usersRepository);

	return registerUseCase;
}
