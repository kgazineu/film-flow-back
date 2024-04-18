import { ResetPassCode } from "./reset-pass-code-interface";

export interface UserRequest {
    name: string;
    nickname: string;
    email: string;
    password: string;
}

// export interface User {
//     id: string;
//     name: string;
//     nickname: string;
//     email: string;
//     ResetPassCode?: ResetPassCode;
//     watch_list: string[];
//     liked_movies: string[];
//     created_at: Date;
//     updated_at: Date;
// }

export interface UserUpdateRequest {
    id: string;
    name?: string;
    nickname?: string;
    email?: string;
}