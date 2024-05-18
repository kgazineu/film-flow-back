import { ResetPassCode } from '@prisma/client'

export interface ResetPassCodeRepository {
    createCode(userId: string, code: string): Promise<ResetPassCode>
    findByUserId(userId: string): Promise<ResetPassCode | null>
    upsertCode(userId: string, code: string): Promise<ResetPassCode>
}