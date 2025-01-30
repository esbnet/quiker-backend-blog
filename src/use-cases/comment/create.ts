import type { CommentCreateResponse, CommentProps } from "./comment-types";

import type { CommentsRepository } from "@/repositories/comments-repository";

export class CommentUseCase {
	constructor(private commentsRepository: CommentsRepository) {}

	async execute({
		authorId,
		postId,
		content,
	}: CommentProps): Promise<CommentCreateResponse> {
		const comment = await this.commentsRepository.createComment({
			authorId,
			postId,
			content,
		});

		return { comment };
	}
}
