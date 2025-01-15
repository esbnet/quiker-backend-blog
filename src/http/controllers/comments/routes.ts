import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { searchCommentById } from "./get-by-id";
import { getCommentsByPostId } from "./getByPostId";
import { list } from "./list";
import { update } from "./update";

export async function comentsRoutes(app: FastifyInstance) {
	app.post("/comment/new", create);
	app.get("/comments", list);
	app.post("/comment", searchCommentById);
	app.post("/comments", getCommentsByPostId);
	app.put("/comment", update);
	app.delete("/comment", deleteComment);
}
