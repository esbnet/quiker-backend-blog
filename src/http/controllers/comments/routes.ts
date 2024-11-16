import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { list } from "./list";
import { searchCommentById } from "./search-by-id";
import { update } from "./update";

export async function comentsRoutes(app: FastifyInstance) {
	app.post("/comment/new", create);
	app.get("/comments", list);
	app.post("/comment", searchCommentById);
	app.put("/comment", update);
	app.delete("/comment", deleteComment);
}
