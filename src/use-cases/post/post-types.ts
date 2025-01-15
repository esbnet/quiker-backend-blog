import type { Post } from "@prisma/client";

export interface PostProps {
	id?: string;
	authorId?: string;
	title?: string;
	content?: string;
	imageUrl?: string;
	views?: number | null;
	likesCount?: number | null;
	dislikesCount?: number | null;
}

export interface PostHistoryProps {
	postId: string;
	authorId: string;
	title?: string;
	content?: string;
	imageUrl?: string;
	views?: number | null;
	likesCount?: number | null;
	dislikesCount?: number | null;
}

export interface PostCreateResponse {
	post: Post;
}
