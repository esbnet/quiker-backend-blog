import { PrismaUsersRepository } from "@/infrastructure/database/repositories/prisma-users-repository";
import { AuthenticateUseCase } from "@/application/use-cases/user/authenticate";

export function makeAutenticateUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const authenticateUseCase = new AuthenticateUseCase(usersRepository);

	return authenticateUseCase;
}
