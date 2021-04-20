import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export class IpLocate {
    country_code: string;
}

export class CurrentIp {
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpaddressClient extends BaseClient{  
  getIpDetails(): Observable<IpLocate> {
    return this.http.get<CurrentIp>('https://myexternalip.com/json').pipe(
      mergeMap(_ => this.lookupIp(_.ip))
    );
  }

  private lookupIp(ipAddress: string): Observable<IpLocate> {
    return this.http.get<IpLocate>('https://www.iplocate.io/api/lookup/' + ipAddress);
  }
}
