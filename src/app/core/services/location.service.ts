import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private localStorageService: LocalStorageService) {
    }

    locate(callback) {
        navigator.geolocation.getCurrentPosition(position => {
            this.reverseGeocode(position.coords.latitude, position.coords.longitude, callback);
          });
    }

    reverseGeocode(lat: number, lng: number, callback) {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);
        let request: any = { latLng: latlng };
        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            let result = results[0];
            if (result != null) {
              if(callback) {
                callback(lat, lng, result.formatted_address);
              } else {
                this.localStorageService.setLocation(lat, lng, result.formatted_address);
              }
            }
          }
        });
    }
}