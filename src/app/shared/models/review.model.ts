import { Category } from './category.model';
import { User } from './user.model';
import { Restaurant } from './restaurant.model';

export class Review {
        id:string;
        rating: number;
        review: string;
        store_id: string;
        user_id: string;
        user: User;
        store: Restaurant;
        created_at: Date;
}