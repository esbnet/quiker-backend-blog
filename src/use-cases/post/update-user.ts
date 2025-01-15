import type { PostCreateResponse, PostProps } from "./post-types";

import type { PostsRepository } from "@/repositories/posts-repository";

export class UpdatePostUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		id,
		title,
		content,
		imageUrl,
		views,
		likesCount,
		dislikesCount,
	}: PostProps): Promise<PostCreateResponse> {
		const oldPost = await this.postsRepository.findById(id as string);

		// arquiva post antigo no histórico
		if (oldPost) {
			await this.postsRepository.registerOnHirstory({
				postId: oldPost.id,
				authorId: oldPost.authorId,
				title: oldPost.title,
				content: oldPost.content,
				imageUrl: oldPost.imageUrl || "",
				views: oldPost.views,
				likesCount: oldPost.likesCount,
				dislikesCount: oldPost.dislikesCount,
			});
		}

		// atualiza post
		const post = await this.postsRepository.update({
			id,
			title,
			content,
			imageUrl,
			views,
			likesCount,
			dislikesCount,
			authorId: oldPost?.authorId as string,
		});

		return { post };
	}
}
