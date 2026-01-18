import type { Post } from "@prisma/client";

export interface PostProps {
	id?: string;
	authorId: string;
	title: string;
	content: string;
	imageUrl: string;
	views: number;
	likes: number;
	dislikes: number;
	createdAt?: string
}

export interface PostHistoryProps {
	id?: string,
	postId: string;
	authorId: string;
	title: string;
	content: string;
	imageUrl: string;
	views: number;
	likes: number;
	dislikes: number;
}

export interface PostCreateResponse {
	post: Post;
}

	// id       String   @id @default(cuid())
	// postId   String   @map("post_id")
	// authorId String   @map("author_id")
	// title    String
	// content  String
	// imageUrl String?  @map("image_url")
	// views    Int?
	// likes    Int?
	// dislikes Int?
	// editedAt DateTime @default(now())
  