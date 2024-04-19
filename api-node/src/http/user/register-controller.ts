import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-case/users/register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        nickname: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { name, nickname, email, password } = registerBodySchema.parse(req.body)

    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    const user = await registerUseCase.handle({
        name,
        nickname,
        email,
        password,
    })

    return reply.status(200).send(user)
}