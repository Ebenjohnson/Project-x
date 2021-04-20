import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { Favourite } from 'src/app/shared/models/favourite.model';
import { SettingService } from 'src/app/core/services/setting.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';

@Component({
  selector: 'favourite-page',
  templateUrl: `./favourite.page.html`, 
  styleUrls: ['./favourite.page.scss'], 
 
})
export class FavouritePage implements OnInit {
  favourites: Array<Favourite> = [];
  category: string;
  totalResults = 0;
  currentPage = 1;
  lastPage = 1;
  loading: boolean = true;
  noResult: boolean = false;
  currency: string;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private restaurantClient: RestaurantClient, private settingService: SettingService,
    private restaurantService: RestaurantService) {
    this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
  }

  ngOnInit() {
    this.currency = this.settingService.getCurrency();
    this.fetchFavourites(this.currentPage);
  }

  fetchFavourites(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.restaurantClient.favourites(this.currentPage).subscribe(res => {
      this.loading = false;
      this.totalResults = res.total;
      if(page == 1) {
        if(res.data.length == 0) {
          this.noResult = true;
        }
        this.favourites = res.data;
      } else {
        this.favourites.push(...res.data);
      }
      this.lastPage = res.last_page;
    }, err => {
      this.loading = false;
      this.noResult = true;
    });
  }
  
  onScroll() {
    if(this.currentPage == this.lastPage) return;
    this.fetchFavourites(this.currentPage+1);
  }

  getCategoriesTitle(restaurant: Restaurant){
    return this.restaurantService.categoriesTitle(restaurant);
} 
}
