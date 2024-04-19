import { UsersRepository } from '../users-repository'
import { UserRegisterRequest } from '../../@types/users-interfaces'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
    async create(data: UserRegisterRequest) {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                nickname: data.nickname,
                email: data.email,
                password_hash: data.password
            }
        })
        return user
    }

    // async findByEmail(email: string) {
    //     // código do Prisma
    // }

    // async findById(id: string) {
    //     // código do Prisma
    // }

    // async update(data: UserUpdateRequest) {
    //     // código do Prisma
    // }

    // async delete(id: string) {
    //     // código do Prisma
    // }
}