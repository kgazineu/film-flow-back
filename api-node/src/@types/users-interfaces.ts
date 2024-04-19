export interface UserRegisterRequest {
    name: string;
    nickname: string | null;
    email: string;
    password: string;
}  