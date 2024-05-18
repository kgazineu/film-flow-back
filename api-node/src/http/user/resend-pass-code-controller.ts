import { PrismaResetPassCodeRepository } from '@/repositories/prisma/prisma-reset-pass-code-repository'
import { CodeAlreadyExistsError } from '@/use-case/errors/code-already-exist-error'
import { UserNotFound } from '@/use-case/errors/user-not-found-error'
import { VerifyCodeStillValid } from '@/use-case/errors/verify-code-still-valid-error'
import { ResendVerifyCodeUseCase } from '@/use-case/users/resend-code-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function RecoverResendPassCode(req: FastifyRequest, reply: FastifyReply) {
    const recoverSendPassCodeBodySchema = z.object({
        email: z.string().email(),
        userId: z.string().uuid()
    })

    const { email, userId } = recoverSendPassCodeBodySchema.parse(req.body)

    try {
        const prismaResetPasswordRepository = new PrismaResetPassCodeRepository()
        const resendPassCode = new ResendVerifyCodeUseCase(prismaResetPasswordRepository)
        

        const { code } = await resendPassCode.handle({
            email,
            userId
        })

        return reply.status(200).send({
            message: 'Code resent successfully',
        })
    } catch(error) {
        if(error instanceof VerifyCodeStillValid) {
            console.log(error)
            return reply.status(401).send({message: error.message})
        }

        throw error
    }
}