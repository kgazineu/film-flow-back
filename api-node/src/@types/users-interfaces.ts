import { UserMovieRating } from "./movie-rating-interfaces";
import { Movie } from "./movies-interfaces";
import { ResetPassCode } from "./reset-pass-code-interfaces";


export interface User {
    id: string;
    name: string;
    nickname: string | null;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
    ratings: UserMovieRating[];
    watch_list: Movie[];
    reset_pass_code: ResetPassCode | null;
  }

export interface UserRegisterRequest {
    name: string;
    nickname: string | null;
    email: string;
    password: string;
}  