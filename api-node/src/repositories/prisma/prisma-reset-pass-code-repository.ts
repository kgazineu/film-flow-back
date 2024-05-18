import { prisma } from '@/lib/prisma'
import { ResetPassCodeRepository } from '@/repositories/reset-pass-code-repository'

export class PrismaResetPassCodeRepository implements ResetPassCodeRepository {
    async createCode(userId: string, code:string){
        const resetPassCode = await prisma.resetPassCode.create({
            data: {
                userId,
                code,
                expires_in: new Date(Date.now() + 1000 * 60 * 5)
            }
        })
        return resetPassCode
    }

    async findByUserId(userId: string) {
        const code = await prisma.resetPassCode.findUnique({
            where: {
                userId
            }
        })

        return code
    }

    async upsertCode(userId: string, code: string){
        const resetPassCode = await prisma.resetPassCode.upsert({
            where: {
                userId
            },
            update: {
                code,
                expires_in: new Date(Date.now() + 1000 * 60 * 5)
            },
            create: {
                userId,
                code,
                expires_in: new Date(Date.now() + 1000 * 60 * 5)
            }
        })

        return resetPassCode
    }

}