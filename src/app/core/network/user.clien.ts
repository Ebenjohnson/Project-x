import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable, throwError } from 'rxjs';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { Address } from 'src/app/shared/models/address.model';
import { AddressRequest } from 'src/app/shared/models/address.request.model';
import { stringify } from 'querystring';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

export class AddressListResponse {
  data: Array<Address>
}

@Injectable({
  providedIn: 'root'
})
export class UserClient extends BaseClient {

  public get(): Observable<User> {
    return this.http.get<User>(this.baseEndpoint + '/user',
    {headers: this.getHeaders()});
  }

  public addressList(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(this.baseCustomerEndpoint + '/address',
    {headers: this.getHeaders()})
    .pipe(
      map((response: Array<any>) => {
        return response.map(_ => new Address().fromJson(_));
      }),
      catchError( (error: any) => {
        return throwError(error);
      })
    );
  }
  
  public addressSave(request: AddressRequest): Observable<Address> {
    return this.http.post<any>(this.baseCustomerEndpoint + '/address', JSON.stringify(request),
    {headers: this.getHeaders()}).pipe(
      map((_: any) => new Address().fromJson(_))
    );
  }

  public addressUpdate(id: number, request: AddressRequest): Observable<Address> {
    return this.http.put<any>(this.baseCustomerEndpoint + '/address/' + String(id) + '/update', JSON.stringify(request),
    {headers: this.getHeaders()}).pipe(
      map((_: any) => new Address().fromJson(_))
    );
  }
}
