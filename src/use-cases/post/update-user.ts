import type { PostCreateResponse, PostUpdateProps } from "./post-types";

import type { PostsRepository } from "@/repositories/posts-repository";

export class UpdatePostUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		id,
		title,
		description,
		imageUrl,
	}: PostUpdateProps): Promise<PostCreateResponse> {
		const post = await this.postsRepository.update({
			id,
			title,
			description,
			imageUrl,
		});

		return { post };
	}
}
