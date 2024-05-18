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

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async findByNickname(nickname: string) {
        const user = await prisma.user.findUnique({
            where: {
                nickname
            }
        })

        return user
    }

    async findUserMovieRatingById(userId: string, movieId: string) {
        const userMovieRating = await prisma.userMovieRating.findFirst({
            where: {
                userId,
                movieId
            }
        })

        return userMovieRating
    }

    async createUserMovieRating(userId: string, movieId: string, rating: number) {
        const userMovieRating = await prisma.userMovieRating.create({
            data: {
                rating: rating,
                userId: userId,
                movieId: movieId
            },
            include: {
                movie: {
                    select: {
                        rating: true,
                        user_movie_rating: true
                    }
                }
            }
        })

        return userMovieRating
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async updatePassword({userId, password}: {userId: string, password: string}) {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password_hash: password
            }
        })

        return user
    }

    // async update(data: UserUpdateRequest) {
    //     // código do Prisma
    // }

    // async delete(id: string) {
    //     // código do Prisma
    // }
}