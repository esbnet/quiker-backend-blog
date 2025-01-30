import type { FastifyInstance } from "fastify";
import { listDislikes } from "./list-dislikes";
import { listLikes } from "./list-likes";
import { searchLike } from "./search-like";
import { toggleDislike } from "./toggle-dislike";
import { toggleLike } from "./toggle-like";

export async function likesRoutes(app: FastifyInstance) {

	// common
	app.post("/post/like", searchLike);

	// likes
	app.put("/post/like", toggleLike);
	app.get("/post/likes", listLikes);

	// dislikes
	app.put("/post/dislike", toggleDislike);
	app.get("/post/dislikes", listDislikes);

}
