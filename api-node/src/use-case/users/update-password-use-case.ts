import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found-error'
import { hash } from 'bcryptjs'

interface UpdatePasswordRequest {
  userId: string
  password: string
}

export class UpdatePasswordUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async handle({
        userId,
        password
    }: UpdatePasswordRequest){
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new UserNotFound()
        }

        const passwordHash = await hash(password, 8)

        const updateUser = await this.usersRepository.updatePassword({
            userId,
            password: passwordHash
        })
        return updateUser
    }
  
}