import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { UpdatePostUseCase } from "@/use-cases/post/update-post";

export function makeUpdatePostUseCase() {
	const postsRepository = new PrismaPostsRepository();
	const updatePostUseCase = new UpdatePostUseCase(postsRepository);

	return updatePostUseCase;
}
