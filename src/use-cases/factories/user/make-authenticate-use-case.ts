import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/user/authenticate";

export function makeAutenticateUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const authenticateUseCase = new AuthenticateUseCase(usersRepository);

	return authenticateUseCase;
}
