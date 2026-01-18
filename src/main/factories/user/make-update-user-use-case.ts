import { PrismaUsersRepository } from "@/infrastructure/database/repositories/prisma-users-repository";
import { UpdateUseCase } from "@/application/use-cases/user/update-user";

export function makeUpdateUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const updateUseCase = new UpdateUseCase(usersRepository);

	return updateUseCase;
}
