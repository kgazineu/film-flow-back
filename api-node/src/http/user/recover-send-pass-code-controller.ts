import { PrismaResetPassCodeRepository } from '@/repositories/prisma/prisma-reset-pass-code-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CodeAlreadyExistsError } from '@/use-case/errors/code-already-exist-error'
import { UserNotFound } from '@/use-case/errors/user-not-found-error'
import { RecoverSendCodeUseCase } from '@/use-case/users/recover-send-pass-code-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function RecoverSendPassCode(req: FastifyRequest, reply: FastifyReply) {
    const recoverSendPassCodeBodySchema = z.object({
        email: z.string().email(),
    })

    const { email } = recoverSendPassCodeBodySchema.parse(req.body)

    try {
        const prismaResetPasswordRepository = new PrismaResetPassCodeRepository()
        const prismaUserRepository = new PrismaUsersRepository()
        const recoverSendCodeUseCase = new RecoverSendCodeUseCase(prismaUserRepository, prismaResetPasswordRepository)
        

        const { code } = await recoverSendCodeUseCase.handle({
            email
        })

        return reply.status(200).send({
            message: 'Code sent successfully',
        })
    } catch(error) {
        if (error instanceof CodeAlreadyExistsError) {
            console.log(error)
            return reply.status(409).send({message: error.message})
        }
        if(error instanceof UserNotFound) {
            console.log(error)
            return reply.status(404).send({message: error.message})
        }

        throw error
    }
}