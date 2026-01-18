import { PrismaPostsRepository } from "@/infrastructure/database/repositories/prisma-posts-repository";
import { CreatePostUseCase } from "@/application/use-cases/post/create";

export function makeCreatePostUseCase() {
	const postsRepository = new PrismaPostsRepository();
	const createUseCase = new CreatePostUseCase(postsRepository);

	return createUseCase;
}
