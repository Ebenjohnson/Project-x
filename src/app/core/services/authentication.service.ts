import { Injectable } from '@angular/core';
import { Constant } from 'src/app/shared/models/constant.model';
import { LoginResponse } from '../network/auth.client';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private loggedInSource = new Subject<boolean>();
    private loggedOutSource = new Subject<boolean>();

    loggedIn$ = this.loggedInSource.asObservable();
    loggedOut$ = this.loggedOutSource.asObservable();

    constructor() {}

    login(loginResponse: LoginResponse) {
        window.localStorage.setItem(Constant.AUTH_USER, JSON.stringify(loginResponse.user));
        window.localStorage.setItem(Constant.AUTH_TOKEN, loginResponse.token);
        this.loggedInSource.next(true);
    }

    logout() {
        window.localStorage.removeItem(Constant.AUTH_USER);
        window.localStorage.removeItem(Constant.AUTH_TOKEN);
        this.loggedOutSource.next(true);
    }

    getCurrentUser(): User {
        let currentUser = null;
        if(this.isLoggedIn()) {
            currentUser = JSON.parse(window.localStorage.getItem(Constant.AUTH_USER));
        }
        return currentUser;
    }
    
    getToken() {
        return window.localStorage.getItem(Constant.AUTH_TOKEN);
    }

    isLoggedIn() {
        if(window.localStorage.getItem(Constant.AUTH_TOKEN)) {
            const token = window.localStorage.getItem(Constant.AUTH_TOKEN);
            // Check whether the token is expired and return
            // true or false
            const helper = new JwtHelperService();
            return !helper.isTokenExpired(token);
        }
        return false;
    }
}