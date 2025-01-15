import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "@/use-cases/post/create";

export function makeCreatePostUseCase() {
	const postsRepository = new PrismaPostsRepository();
	const createUseCase = new CreatePostUseCase(postsRepository);

	return createUseCase;
}
