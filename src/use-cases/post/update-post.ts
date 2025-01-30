import type { PostsRepository } from "@/repositories/posts-repository";
import type { PostCreateResponse, PostProps } from "./post-types";

export class UpdatePostUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		id,
		title,
		content,
		imageUrl,
		views,
		likes,
		dislikes,
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
				likes: oldPost.likes,
				dislikes: oldPost.dislikes,
				
			});
		}

		// atualiza post
		const post = await this.postsRepository.update({
			id, 
			title,
			content,
			imageUrl,
			views,
			likes,
			dislikes,
			authorId: oldPost?.authorId as string,
		});

		return { post };
	}
}