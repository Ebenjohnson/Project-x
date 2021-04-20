import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BaseClient {    
    protected baseEndpoint;
    protected baseCustomerEndpoint;

    constructor(protected http: HttpClient, protected authenticationService: AuthenticationService, protected appConfigService: AppConfigService,
        protected localStorageService: LocalStorageService) {
        this.baseEndpoint = this.appConfigService.getConfig().apiBaseUrl;
        this.baseCustomerEndpoint = this.baseEndpoint + '/customer';
    }        

    protected getHeaders(): HttpHeaders {
        let headers = {'Accept': 'application/json'};
        let token = this.authenticationService.getToken();
        
        if(token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        headers['Content-Type'] = 'application/json';

        return new HttpHeaders(headers);
    }    
}