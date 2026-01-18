import { PrismaCommentsRepository } from "@/infrastructure/database/repositories/prisma-comments-repository";
import { CommentUseCase } from "@/application/use-cases/comment/create";

export function makeCreateCommentUseCase() {
	const commentsRepository = new PrismaCommentsRepository();
	const createUseCase = new CommentUseCase(commentsRepository);

	return createUseCase;
}
