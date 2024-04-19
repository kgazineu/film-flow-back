import { UserRegisterRequest } from '@/@types/users-interfaces'
import { User } from '@prisma/client'

export interface UsersRepository {
    create(data: UserRegisterRequest): Promise<User>
    // findByEmail(email: string): Promise<User | null>
    // findById(id: string): Promise<User | null>
    // update(data: UserUpdateRequest): Promise<User>
    // delete(id: string): Promise<void>
}