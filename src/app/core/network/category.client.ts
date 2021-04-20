import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Category } from 'src/app/shared/models/category.model';
import { BaseClient } from './base.client';
import { Observable } from 'rxjs';

export class CategoryResponse {
  data: Array<Category>;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryClient extends BaseClient{
  
  public list(): Observable<CategoryResponse> {
    let currentLocation = this.localStorageService.getLocation();
    let params = new HttpParams().set('lat', currentLocation.lat).set('long', currentLocation.lng);

    return this.http.get<CategoryResponse>(this.baseCustomerEndpoint + '/category',
    {headers: this.getHeaders(), params: params});
  }
}
