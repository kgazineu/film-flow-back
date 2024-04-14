import { User } from "./users-interfaces";

export interface MovieRequest {
    name: string;
    gender: string;
    synopsis: string;
    release_date: string;
}

export interface Movie {
    id: string;
    name: string;
    release_date: string;
    gender: string;
    synopsis: string;
    user_likes: User[];
}