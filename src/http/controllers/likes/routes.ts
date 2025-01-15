import type { FastifyInstance } from "fastify";
import { searchLikeByPostIdAndAuthotId } from "./get-by-id";
import { list } from "./list";
import { update } from "./update";

export async function likesRoutes(app: FastifyInstance) {
	app.put("/post/like", update);
	app.post("/post/like", searchLikeByPostIdAndAuthotId);
	app.get("/post/likes", list);
}
