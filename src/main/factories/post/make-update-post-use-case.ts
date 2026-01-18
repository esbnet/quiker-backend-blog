import { PrismaPostsRepository } from "@/infrastructure/database/repositories/prisma-posts-repository";
import { UpdatePostUseCase } from "@/application/use-cases/post/update-post";

export function makeUpdatePostUseCase() {
	const postsRepository = new PrismaPostsRepository();
	const updatePostUseCase = new UpdatePostUseCase(postsRepository);

	return updatePostUseCase;
}
