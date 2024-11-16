import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { CommentUseCase } from "@/use-cases/comment/create";

export function makeCreateCommentUseCase() {
	const commentsRepository = new PrismaCommentsRepository();
	const createUseCase = new CommentUseCase(commentsRepository);

	return createUseCase;
}
