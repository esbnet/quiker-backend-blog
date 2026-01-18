import { PrismaCommentsRepository } from "@/infrastructure/database/repositories/prisma-comments-repository";
import { UpdateCommentUseCase } from "@/application/use-cases/comment/update-comment";

export function makeUpdateCommentUseCase() {
	const commentsRepository = new PrismaCommentsRepository();
	const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository);

	return updateCommentUseCase;
}
