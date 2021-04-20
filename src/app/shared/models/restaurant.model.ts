import { Category } from './category.model';

export class Restaurant {
        id:string;
        name: string;
        tagline: string;
        image_url: string;
        delivery_time: string;
        minimum_order: number;
        delivery_fee: number;
        details: string;
        area: string;
        address: string;
        longitude: string;
        latitude:string;
        preorder: boolean;
        serves_non_veg: boolean;
        cost_for_two: number;
        status: string;
        opens_at: string;
        closes_at: string;
        owner_id: string;
        created_at: string;
        updated_at: string;
        distance: number;
        favourite: number=0;
        ratings: string;
        ratings_count: number;
        categories: Array<Category>;
}