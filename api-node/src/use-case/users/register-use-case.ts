import { UsersRepository } from '@/repositories/users-repository'
import { UserRegisterRequest } from '@/@types/users-interfaces'

export class RegisterUseCase {
    constructor (private usersRepository: UsersRepository) {}

    async handle ({
        name,
        nickname,
        email,
        password,
    }: UserRegisterRequest){

        // Validar se o usuário ja existe aqui

        // Criptografar a senha do usuário aqui

        const user = await this.usersRepository.create({
            name,
            nickname,
            email,
            password,
        })
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash , ...userWithoutPassword } = user

        return userWithoutPassword
    }
}
