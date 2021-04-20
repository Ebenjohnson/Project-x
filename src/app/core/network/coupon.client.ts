import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/shared/models/coupon.model';
import { HttpParams } from '@angular/common/http';

export class CouponListResponse {
  data: Array<Coupon>;
  total: number;
  last_page: number;
}

@Injectable({
  providedIn: 'root'
})
export class CouponClient extends BaseClient{  
  public list(currentPage: number): Observable<CouponListResponse> {
    let params = new HttpParams().set('page', String(currentPage));
    return this.http.get<CouponListResponse>(this.baseCustomerEndpoint + '/coupons',
    {headers: this.getHeaders(), params: params});
  }

  public validateCouponCode(code: string): Observable<any> {
    let params = new HttpParams().set('code', code);

    return this.http.get<Coupon>(this.baseCustomerEndpoint + '/coupon-validity',
    {headers: this.getHeaders(), params: params});
  }
}
