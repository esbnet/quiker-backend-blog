import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "@/infrastructure/env";
import { setupRoutes } from "@/presentation/routes";

export const app = fastify();

app.register(cors, {
	origin: true,
	credentials: true,
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
});

app.register(cookie);

app.register(setupRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.: ", issue: error.format() });
	}

	if (env.NODE_ENV !== "prod") {
		console.error(error);
	} else {
		// TODO: log error on external tools (datadog, sentry, etc)
	}

	return reply.status(500).send({ message: "Internal server error." });
});
