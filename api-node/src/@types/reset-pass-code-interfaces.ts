import { User } from './users-interfaces';
import { UserMovieRating } from './movie-rating-interfaces';    

export interface ResetPassCode {
    code: string;
    expires_in: Date;
    userId: string;
    user: User;
  }