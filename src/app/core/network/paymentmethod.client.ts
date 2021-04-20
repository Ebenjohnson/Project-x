import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable } from 'rxjs';
import { PaymentMethod } from 'src/app/shared/models/paymentmethod.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodClient extends BaseClient{  
  public list(): Observable<Array<PaymentMethod>> {
    return this.http.get<Array<PaymentMethod>>(this.baseCustomerEndpoint + '/payment-methods',
    {headers: this.getHeaders()});
  }
}
