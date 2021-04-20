import { Component, OnInit } from '@angular/core';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { SettingService } from 'src/app/core/services/setting.service';
import { Setting } from 'src/app/shared/models/setting.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
    selector: 'home-featured',
    templateUrl: `./featured.component.html`,
    styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
    restaurants: Array<Restaurant> = [];
    currency: string;
    loading: boolean = true;
    noResult: boolean = false;
    
    constructor(private restaurantClient: RestaurantClient, private settingService: SettingService, private restaurantService: RestaurantService,
        private localStorageService: LocalStorageService ) {
            this.localStorageService.locationUpdate$.subscribe(_ => this.fetchRestaurants());
    }
    
    ngOnInit() {
        this.fetchRestaurants();
    }
    
    fetchRestaurants() {
        this.restaurantClient.featuredList().subscribe(res => {
            this.loading = false;
            this.noResult = res.data.length == 0 ? true : false;
            this.restaurants = res.data;
            this.currency = this.settingService.getCurrency();
        }, err => {
            this.loading = false;
            this.noResult = true;
            console.log(err);
        });
    }

    getCategoriesTitle(restaurant: Restaurant){
        return this.restaurantService.categoriesTitle(restaurant);
    } 
}