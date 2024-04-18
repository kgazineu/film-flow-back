import { User } from "./users-interfaces";
import { UserMovieRating } from "./movie-rating-interfaces";

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
    image: string | null;
    created_at: Date;
    updated_at: Date;
    watched_by: User[];
    user_movie_rating: UserMovieRating[];
  }
