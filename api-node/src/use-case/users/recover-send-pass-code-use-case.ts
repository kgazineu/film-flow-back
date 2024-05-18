import {CodeAlreadyExistsError} from '@/use-case/errors/code-already-exist-error'
import {ResetPassCodeRepository} from '@/repositories/reset-pass-code-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found-error'
import { mailer } from '@/utils/mailer'

interface RecoverSendCodeRequest {
    email: string
}

export class RecoverSendCodeUseCase {
    constructor(private usersRespository: UsersRepository ,private resetPassCodeRepository: ResetPassCodeRepository) {}

    async handle({
        email
    }: RecoverSendCodeRequest) {
        const user = await this.usersRespository.findByEmail(email)
        if (!user){
            throw new UserNotFound()
        }

        const resetPassCode = await this.resetPassCodeRepository.findByUserId(user.id)
        if (resetPassCode){
            throw new CodeAlreadyExistsError()
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
        const ResetPassCode = await this.resetPassCodeRepository.createCode(user.id, resetCode)

        mailer.sendMail({
            from: 'icaro <icarocedraz7@gmail.com>',
            to: `<${email}>`,
            subject: 'Verify your email',
            html: `<h1>Seu código de verificação é: ${resetCode}</h1>`
        })

        return ResetPassCode
    }
}