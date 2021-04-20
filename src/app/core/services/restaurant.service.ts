import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { Category } from 'src/app/shared/models/category.model';
import { MenuItem } from 'src/app/shared/models/menuitem.model';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    constructor() {

    }
    
    categoriesTitle(restaurant: Restaurant){
        let categoriesTitle = [];
        restaurant.categories.forEach((val:Category) => {
            categoriesTitle.push(val.title);
        });
        return categoriesTitle.join(", ").trim();
    }

    categoriesTitleForMenuItem(menuItem: MenuItem){
        let categoriesTitle = [];
        menuItem.categories.forEach((val:Category) => {
            categoriesTitle.push(val.title);
        });
        return categoriesTitle.join(", ").trim();
    }
}