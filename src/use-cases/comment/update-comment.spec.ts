import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCommentsRepository } from "@/repositories/in-memory/in-memory-comments-repository";
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error";
import { CommentUseCase } from "./create";

let commentsRepository: InMemoryCommentsRepository;
let sut: CommentUseCase;

describe("Comment Use Case", () => {
	beforeEach(() => {
		commentsRepository = new InMemoryCommentsRepository();
		sut = new CommentUseCase(commentsRepository);
	});

	it("should be able to comment", async () => {
		const CommentsRepository = new CommentUseCase(
			new InMemoryCommentsRepository(),
		);

		const { comment } = await CommentsRepository.execute({
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(comment.id).toEqual(expect.any(String));
	});

	it("should not be able to comment comment with same email twice", async () => {
		const email = "any_email@gmail.com";

		await sut.execute({
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		await expect(() =>
			sut.execute({
				content:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
				authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
			}),
		).rejects.toBeInstanceOf(ItemAlreadyExistsError);
	});
});
