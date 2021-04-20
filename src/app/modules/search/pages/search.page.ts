import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { RestaurantFilter } from 'src/app/shared/models/restaurant.filter';

@Component({
  selector: 'search-page',
  templateUrl: `./search.page.html`,
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit{
  restaurants: Array<Restaurant> = [];
  searchTerm: string;
  category: string;
  totalResults = 0;
  currentPage = 1;
  lastPage = 1;
  restaurantFilter: RestaurantFilter = null;
  loading: boolean = true;
  noResult: boolean = false;
  
  constructor(public localStorageService: LocalStorageService, private appConfigService: AppConfigService, private restaurantClient: RestaurantClient,
    private route: ActivatedRoute){
    }
    
    ngOnInit() {
      this.route
      .queryParamMap.subscribe(params => {
        this.searchTerm = params.get('search');
        this.category = params.get('category');
        this.fetchRestaurants(1);
      });
    }
    
    fetchRestaurants(page: number) {
      this.loading = true;
      this.currentPage = page;
      this.restaurantClient.search(this.searchTerm, this.category, this.currentPage, this.restaurantFilter).subscribe(res => {
        this.loading = false;
        this.totalResults = res.total;
        if(page == 1) {
          if(res.data.length == 0) {
            this.noResult = true;
          }
          this.restaurants = res.data;
        } else {
          this.restaurants.push(...res.data);
        }
        this.lastPage = res.last_page;
      }, err => {
        this.loading = false;
        this.noResult = true;
        console.log(err);
      });
    }
    
    onScroll() {
      if(this.currentPage == this.lastPage) return;
      this.fetchRestaurants(this.currentPage+1);
    }

    onFilterChange(restaurantFilter: RestaurantFilter) {
      this.searchTerm = restaurantFilter.search;
      this.restaurantFilter = restaurantFilter;
      this.fetchRestaurants(1);
    }
  }
  