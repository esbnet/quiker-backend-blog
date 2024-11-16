import type { Comment, Prisma } from "@prisma/client";

import type { CommentProps } from "@/use-cases/comment/comment-types";

export interface CommentsRepository {
	createComment(data: CommentProps): Promise<Comment>;
	findById(id: string): Promise<Comment | null>;
	findByAuthorId(id: string): Promise<Comment | null>;
	update(data: Prisma.CommentUpdateInput): Promise<Comment>;
	delete(id: string): Promise<void>;
}
