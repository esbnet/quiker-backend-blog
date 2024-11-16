import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUseCase } from "@/use-cases/user/update-user";

export function makeUpdateUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const updateUseCase = new UpdateUseCase(usersRepository);

	return updateUseCase;
}
