import { ResetPassCodeRepository } from '@/repositories/reset-pass-code-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found-error'
import { InvalidCodeError } from '../errors/invalid-code-error'
import { CodeDoesntExistError } from '../errors/code-doesnt-exist-error'

interface VerifyCodeRequest {
    email: string
    code: string
}

export class VerifyCodeUseCase {
    constructor(private usersRepository: UsersRepository, private resetPassCodeRepository: ResetPassCodeRepository) {}
    async handle({
        email,
        code
    }: VerifyCodeRequest) {
        const user = await this.usersRepository.findByEmail(email)
        if (!user){
            throw new UserNotFound()
        }
        
        const verifyCode = await this.resetPassCodeRepository.findByUserId(user.id)
        
        if (!verifyCode){
            throw new CodeDoesntExistError()
        }
        
        if(verifyCode.code !== code){
            throw new InvalidCodeError()
        } 

        return user
    }
  
}