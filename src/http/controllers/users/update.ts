import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeUpdateUserUseCase } from "@/use-cases/factories/user/make-update-user-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
	const updateBodySchema = z.object({
		id: z.string().cuid(),
		name: z
			.string()
			.min(3, "O nome deve ter no mínimo 3 caracteres")
			.max(100, "O nome deve ter no máximo 100 caracteres"),
		email: z.string().email("Informe um e-mail válido"),
		password: z
			.string()
			.min(6, "A senha deve ter no mínimo 6 caracteres")
			.max(12, "A senha deve ter no máximo 12 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),
	});

	const { id, name, email, password } = updateBodySchema.parse(request.body);

	try {
		const updateUseCase = makeUpdateUserUseCase();

		await updateUseCase.execute({
			id,
			name,
			email,
			password,
		});
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply.status(200).send({message:`Usuário ${email} atualizado com sucesso!`, user:{
		id, name, email
	}});
}
