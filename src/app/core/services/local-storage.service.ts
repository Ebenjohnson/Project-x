import { Injectable } from '@angular/core';
import { Constant } from 'src/app/shared/models/constant.model';
import { Location } from 'src/app/shared/models/location.model';
import { LoginResponse } from '../network/auth.client';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { Setting } from 'src/app/shared/models/setting.model';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private locationUpdateSource = new Subject<Location>();
    public readonly defaultLat: number = 25.248718;
    public readonly defaultLng: number = 55.304787;
    public readonly defaulText: string = 'Al Karama, Dubai';
    locationUpdate$ = this.locationUpdateSource.asObservable();
    
    getLocation(): Location {
        if(window.localStorage.getItem(Constant.LOCATION_TEXT)) {
            return new Location(window.localStorage.getItem(Constant.LATITUDE),
            window.localStorage.getItem(Constant.LONGITUDE),
            window.localStorage.getItem(Constant.LOCATION_TEXT)
            );
        }
        
        return new Location(this.defaultLat, this.defaultLng, this.defaulText);
    }
    
    setLocation(lat, lng, text) {
        window.localStorage.setItem(Constant.LATITUDE, lat);
        window.localStorage.setItem(Constant.LONGITUDE, lng);
        window.localStorage.setItem(Constant.LOCATION_TEXT, text);
        this.locationUpdateSource.next(new Location(lat, lng, text));
    }

    setSettings(settings: Array<Setting>) {
        window.localStorage.setItem(Constant.SETTINGS.SETTING_STORAGE, JSON.stringify(settings));
    }

    getSettings() {
        return JSON.parse(window.localStorage.getItem(Constant.SETTINGS.SETTING_STORAGE));
    }
    
    isLocationSet() {
        let currentLocation = this.getLocation();
        return currentLocation.lat != this.defaultLat;
    }
    
    setCart(cart: Cart) {
        window.localStorage.setItem(Constant.CART, JSON.stringify(cart));
    }
    
    getCart(): Cart {
        let cart: Cart = new Cart();
        let cartJsonString = window.localStorage.getItem(Constant.CART);
        if(cartJsonString) {
            cart = JSON.parse(cartJsonString);
        }
        return cart;
    }
}