import { Review } from './review.model';

export class ReviewListResponse {
    data: Array<Review>;
    total: number;
}