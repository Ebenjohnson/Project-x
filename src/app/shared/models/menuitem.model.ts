import { Category } from './category.model';

export class MenuItem {
        id:number;
        title: string;
        detail: string;
        specification: string;
        image_url: string;
        price: number;
        is_available: number;
        is_non_veg: number;
        status: string;
        categories: Array<Category>;
        quantity: number = 0;
}