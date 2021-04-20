import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { BaseClient } from './base.client';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';
import { MenuItem } from 'src/app/shared/models/menuitem.model';
import { Review } from 'src/app/shared/models/review.model';
import { ReviewListResponse } from 'src/app/shared/models/review.list.response';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { RestaurantFilter } from 'src/app/shared/models/restaurant.filter';
import { Favourite } from 'src/app/shared/models/favourite.model';

export class RestaurantListResponse {
  data: Array<Restaurant>;
  total: number;
  last_page: number;
}

export class FavouriteListResponse {
  data: Array<Favourite>;
  total: number;
  last_page: number;
}

export class RestaurantResponse {
  store: Restaurant;
  menu_items:  Array<MenuItem>;
}

interface LatLng {
  lat: string;
  lng: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantClient extends BaseClient {  
  public featuredList(): Observable<RestaurantListResponse> {
    let params = this.prepareListParams();
    params = params.set("type", "featured");
    return this.http.get<RestaurantListResponse>(this.baseCustomerEndpoint + '/store',
    {headers: this.getHeaders(), params: params});
  }

  public popularList(): Observable<RestaurantListResponse> {
    let params = this.prepareListParams();
    params = params.set("type", "popular");
    return this.http.get<RestaurantListResponse>(this.baseCustomerEndpoint + '/store',
    {headers: this.getHeaders(), params: params});
  }
  
  public search(searchTerm, categoryId, page: number, restaurantFilter: RestaurantFilter): Observable<RestaurantListResponse> {
    let params = this.prepareListParams();
    params = params.set("page", String(page));
    if(searchTerm) {
      params = params.set("search", searchTerm);
    }
    if(categoryId) {
      params = params.set("category_id", categoryId);
    }
    if(restaurantFilter) {
      if(restaurantFilter.vegOnly) {
        params = params.set("veg_only", "1");
      }
      if(restaurantFilter.sort == "cost_for_two_sort_asc") {
        params = params.set("cost_for_two_sort", "asc");
      }
      if(restaurantFilter.sort == "cost_for_two_sort_desc") {
        params = params.set("cost_for_two_sort", "desc");
      }
    }
    return this.http.get<RestaurantListResponse>(this.baseCustomerEndpoint + '/store',
    {headers: this.getHeaders(), params: params});
  }
  
  public get(id): Observable<RestaurantResponse> {
    return this.http.get<RestaurantResponse>(this.baseCustomerEndpoint + '/store/' + id,
    {headers: this.getHeaders()});
  }

  public getReviews(id) {
    return this.http.get<ReviewListResponse>(this.baseCustomerEndpoint + '/rating/' + id,
    {headers: this.getHeaders()});
  }

  public count(): Observable<number> {
    let params = this.prepareListParams();
    return this.http.get<any>(this.baseCustomerEndpoint + '/store/count',
    {headers: this.getHeaders(), params: params}).pipe(
      map(_ =>  _.count),
      catchError( (error: any) => {
        return of(0);
      })
    );
  }

  public toggleFavourite(restaurantId): Observable<number> {
    return this.http.post<any>(this.baseCustomerEndpoint + '/favourite/' + restaurantId, {},
    {headers: this.getHeaders()}).pipe(
      map(_ => _.favourite)
    );
  }

  public favourites(page: number): Observable<FavouriteListResponse> {
    let params = new HttpParams().set('page', String(page));
    return this.http.get<FavouriteListResponse>(this.baseCustomerEndpoint + '/favourite',
    {headers: this.getHeaders(), params: params});
  }
  
  private prepareListParams() {
    let currentLocation = this.localStorageService.getLocation();
    let params = new HttpParams().set('lat', currentLocation.lat).set('long', currentLocation.lng);
    return params;
  }
}
