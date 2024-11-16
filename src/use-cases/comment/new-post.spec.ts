import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCommentsRepository } from "@/repositories/in-memory/in-memory-comments-repository";
import { CommentUseCase } from "./create";

let commentsRepository: InMemoryCommentsRepository;
let sut: CommentUseCase;

describe("Register Use Case", () => {
	beforeEach(() => {
		commentsRepository = new InMemoryCommentsRepository();
		sut = new CommentUseCase(commentsRepository);
	});

	it("should be able to register", async () => {
		const CommentsRepository = new CommentUseCase(
			new InMemoryCommentsRepository(),
		);

		const { comment } = await CommentsRepository.execute({
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(comment.id).toEqual(expect.any(String));
	});
});
