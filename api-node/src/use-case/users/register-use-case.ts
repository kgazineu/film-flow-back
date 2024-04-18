import { UsersRepository } from "@/repositories/users-repository"
import { UserRegisterRequest } from "@/@types/users-interfaces"

export class RegisterUseCase {
  constructor (private usersRepository: UsersRepository){
    
  }
  async handle ({
    name,
    nickname,
    email,
    password,
  }: UserRegisterRequest){
    const user = await this.usersRepository.create({
      name,
      nickname,
      email,
      password,
    })
    
    const { password_hash , ...userWithoutPassword } = user;

    return userWithoutPassword
  }
}
