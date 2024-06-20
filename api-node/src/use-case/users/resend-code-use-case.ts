import { ResetPassCodeRepository } from '@/repositories/reset-pass-code-repository'
import { mailer } from '@/utils/mailer'
import { VerifyCodeStillValid } from '../errors/verify-code-still-valid-error'

interface ResendVerifyEmailCodeRequest {
    userId: string
    email: string
}

export class ResendVerifyCodeUseCase {
    constructor(private resetPassCodeRepository: ResetPassCodeRepository) {}

    async handle({
        userId,
        email
    }: ResendVerifyEmailCodeRequest) {
        const verifyCodeExists = await this.resetPassCodeRepository.findByUserId(userId)

        if (verifyCodeExists && verifyCodeExists.expires_in > new Date()) {
            throw new VerifyCodeStillValid()
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const userVerifyCode = await this.resetPassCodeRepository.upsertCode(userId, code)

        mailer.sendMail({
            from: 'icaro <icarocedraz7@gmail.com>',
            to: `<${email}>`,
            subject: 'Verify your email',
            html: `<h1>Seu código de verificação é: ${userVerifyCode.code}</h1>`
        })

        return userVerifyCode
    }
}