import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFound } from '@/use-case/errors/user-not-found-error'
import { UpdatePasswordUseCase } from '@/use-case/users/update-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updatePasswordController(request: FastifyRequest, reply: FastifyReply) {
    const verifyEmailBodySchema = z.object({
        password: z.string().min(6)
    })

    const { password } = verifyEmailBodySchema.parse(request.body)

    try{
        const prismaUsersRepository = new PrismaUsersRepository()
        const updatePasswordUseCase = new UpdatePasswordUseCase(prismaUsersRepository)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updateUser = await updatePasswordUseCase.handle({
            userId: request.user.sub,
            password
        })

        return reply.code(200).send({
            message: 'Password updated successfully.'
        })
    } catch(error) {
        if (error instanceof UserNotFound){
            return reply.code(404).send({
                message: error.message
            })
        }
    }
}