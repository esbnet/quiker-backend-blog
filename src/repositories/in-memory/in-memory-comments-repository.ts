import type { Comment, Prisma } from "@prisma/client";

import type { CommentProps } from "@/use-cases/comment/comment-types";
import type { CommentsRepository } from "../comments-repository";

export class InMemoryCommentsRepository implements CommentsRepository {
	createComment(data: CommentProps): Promise<Comment> {
		throw new Error("Method not implemented.");
	}

	update(data: Prisma.CommentUpdateInput): Promise<Comment> {
		throw new Error("Method not implemented."); // TODO
	}

	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async findById(id: string) {
		const comment = this.items.find((item) => item.id === id);
		if (!comment) {
			return null;
		}
		return comment;
	}

	public items: Comment[] = [];

	async findByAuthorId(userId: string) {
		const comment = this.items.find((item) => item.authorId === userId);

		if (!comment) {
			return null;
		}
		return comment;
	}
}
