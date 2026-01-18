import { app } from "./config/app";
import { env } from "@/infrastructure/env";

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Server running on port ${env.PORT} 🚀`);
});
