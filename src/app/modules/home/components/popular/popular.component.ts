import { Component, OnInit } from '@angular/core';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { SettingService } from 'src/app/core/services/setting.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
    selector: 'home-popular',
    templateUrl: `./popular.component.html`,
    styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
    restaurants: Array<Restaurant> = [];
    currency: string;
    loading: boolean = true;
    noResult: boolean = false;
    
    constructor(private restaurantClient: RestaurantClient, private settingService: SettingService, private localStorageService: LocalStorageService) {
        this.localStorageService.locationUpdate$.subscribe(_ => this.fetchRestaurants());
    }
    
    ngOnInit() {
        this.fetchRestaurants();
    }
    
    fetchRestaurants() {
        this.restaurantClient.popularList().subscribe(res => {
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
}