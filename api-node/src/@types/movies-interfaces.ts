import { User } from "./users-interfaces";

export interface MovieRequest {
    name: string;
    gender: string;
    synopsis: string;
    release_date: string;
}

export interface Movie {
    id: string;
    title: string;
    release_date: Date;
    gender: string;
    description: string;
    image?: string;
    watched_by: User[];
    created_at: Date;
    updated_at: Date;
}