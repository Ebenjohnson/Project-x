import { Injectable } from '@angular/core';
import { BaseClient } from './base.client';
import { Observable } from 'rxjs';
import { Setting } from 'src/app/shared/models/setting.model';


@Injectable({
  providedIn: 'root'
})
export class SettingClient extends BaseClient{  
  public list(): Observable<Array<Setting>> {
    return this.http.get<Array<Setting>>(this.baseEndpoint + '/settings',
    {headers: this.getHeaders()});
  }
}
