import type { CommentCreateResponse, CommentProps } from "./comment-types";

import type { CommentsRepository } from "@/repositories/comments-repository";

export class UpdateCommentUseCase {
	constructor(private commentsRepository: CommentsRepository) {}

	async execute({
		id,
		description,
		removed,
	}: CommentProps): Promise<CommentCreateResponse> {
		const comment = await this.commentsRepository.update({
			id,
			description,
			removed,
		});

		return { comment };
	}
}
