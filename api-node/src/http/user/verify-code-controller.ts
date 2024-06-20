import { PrismaResetPassCodeRepository } from '@/repositories/prisma/prisma-reset-pass-code-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CodeDoesntExistError } from '@/use-case/errors/code-doesnt-exist-error'
import { InvalidCodeError } from '@/use-case/errors/invalid-code-error'
import { UserNotFound } from '@/use-case/errors/user-not-found-error'
import { VerifyCodeUseCase } from '@/use-case/users/recover-verify-code-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function VerifyCode(req: FastifyRequest, reply: FastifyReply){
    const verifyCodeBodySchema = z.object({
        email: z.string().email(),
        code: z.string()
    })

    const { email, code } = verifyCodeBodySchema.parse(req.body)

    try {
        const prismaResetPassCodeRepository = new PrismaResetPassCodeRepository()
        const prismaUsersRepository = new PrismaUsersRepository()
        const verifyCode = new VerifyCodeUseCase(prismaUsersRepository, prismaResetPassCodeRepository)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await verifyCode.handle({
            email,
            code
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '5m'
            }
        })

        return reply.status(200).send({
            token: token
        })
    } catch(error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({message: error.message})
        }
        if (error instanceof InvalidCodeError) {
            return reply.status(400).send({message: error.message})
        }
        if (error instanceof CodeDoesntExistError) {
            return reply.status(400).send({message: error.message})
        }
        throw error
    }
}