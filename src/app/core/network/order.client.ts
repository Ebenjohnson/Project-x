import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable, pipe, of } from 'rxjs';
import { OrderRequest } from 'src/app/shared/models/order.request.model';
import { Order } from 'src/app/shared/models/order.model';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class OrderListResponse {
  data: Array<Order>;
  total: number;
  last_page: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderClient extends BaseClient {  

  public calculateDeliveryFee(addressId, restaurantId): Observable<number> {
    let request = {"address_id": addressId, "store_id": restaurantId};
    return this.http.post<any>(this.baseCustomerEndpoint + '/order/calculate-delivery-fee', JSON.stringify(request),
    {headers: this.getHeaders()}).pipe(
      map(_ => parseFloat(_.delivery_fee))
    );
  }
  
  public createOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.baseCustomerEndpoint + '/order', JSON.stringify(orderRequest),
    {headers: this.getHeaders()});
  }

  public get(orderId): Observable<Order> {
    return this.http.get<Order>(this.baseCustomerEndpoint + '/order/' + orderId,
    {headers: this.getHeaders()});
  }
  
  public listOrder(currentPage: number): Observable<OrderListResponse> {
    let params = new HttpParams().set('page', String(currentPage));
    return this.http.get<OrderListResponse>(this.baseCustomerEndpoint + '/order',
      {headers: this.getHeaders(), params: params});
  }

  public paymentStripe(orderId: number, token: string): Observable<any>
  {
    return this.http.post<any>(this.baseCustomerEndpoint + '/order/' + orderId + '/payment/stripe', JSON.stringify({'token': token}),
    {headers: this.getHeaders()});
  }
    
}
  