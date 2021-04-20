import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {BaseClient} from './base.client';
import { User } from 'src/app/shared/models/user.model';
import { RegisterRequest } from 'src/app/shared/models/register.request.model';

export class LoginRequest {
    email: string;
    password: string;
    role: string;
}

export class LoginResponse {
    token: string;
    user: User;
}

@Injectable()
export class AuthClient extends BaseClient {
    
    public login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.baseEndpoint + '/login', JSON.stringify(request),
        {headers: this.getHeaders()});
    }

    public register(request: RegisterRequest): Observable<LoginResponse> {
        // attach country code with mobile number
        let regiserRequest = Object.assign({}, request);
        regiserRequest.mobile_number = request.countryPhoneCode + request.mobile_number;

        return this.http.post<LoginResponse>(this.baseEndpoint + '/register', JSON.stringify(regiserRequest),
        {headers: this.getHeaders()});
    }

    public verifyMobile(mobileNumber: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.baseEndpoint + '/verify-mobile', JSON.stringify({mobile_number: mobileNumber}),
        {headers: this.getHeaders()});
    }
    
}
