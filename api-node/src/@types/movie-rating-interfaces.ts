import { Movie } from "./movies-interfaces";
import { User } from "./users-interfaces";


export interface UserMovieRating {
  id: string;
  rating: number;
  user: User;
  userId: string;
  movie: Movie;
  movieId: string;
}
