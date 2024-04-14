import { UserRequest, User, UserUpdateRequest } from "../@types/users-interfaces";

export interface UsersRepository {
    create(data: UserRequest): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(data: UserUpdateRequest): Promise<User>
    delete(id: string): Promise<void>
}