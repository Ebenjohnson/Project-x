import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppConfigService } from 'src/app/app-config.service';
import { Category } from 'src/app/shared/models/category.model';
import { Router, NavigationExtras } from '@angular/router';
import { RestaurantClient } from 'src/app/core/network/restaurant.client';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'home-page',
  templateUrl: `./home.page.html`,
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  markers = [];
  locationText = '';
  locationRestaurantCount = 0;
  categories: Array<Category> = [];
  searchTerm: string = "";
  loadingLocation = false;
  
  mapConfig = {
    zoom: 12,
    center: null,
    options: {
      zoomControl: true,
      mapTypeId: 'roadmap',
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    }
  };
  constructor(public localStorageService: LocalStorageService, private appConfigService: AppConfigService, private router: Router,
    private restaurantClient: RestaurantClient, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef){
      localStorageService.locationUpdate$.subscribe(_ => { 
        this.onLocationChange(_.lat, _.lng, _.text);
      });
    }
    
    ngOnInit() {
      if(!this.localStorageService.isLocationSet()) {
        this.locationService.locate(null);
      }
      let location = this.localStorageService.getLocation();
      
      this.onLocationChange(location.lat, location.lng, location.text);
    }
    
    getLocation($event) {
      this.localStorageService.setLocation($event.geometry.location.lat(), $event.geometry.location.lng(), $event.formatted_address);
      
      this.onLocationChange($event.geometry.location.lat(), $event.geometry.location.lng(), $event.formatted_address);
    }
    
    gotoSearch() {
      if(!this.searchTerm) {
        return;
      }
      let navigationExtras: NavigationExtras = {
        queryParams: { 'search': this.searchTerm },
        fragment: 'anchor'
      };
      
      this.router.navigate(['/search'], navigationExtras);
    }
    
    updateStoreCount() {
      // update store count
      this.restaurantClient.count().subscribe(_ => this.locationRestaurantCount = _);
    }

    locate() {
      this.loadingLocation = true;
      this.locationService.locate(null);
    }

    private onLocationChange(lat, lng, text) {
      this.loadingLocation = false;
      
      lat = parseFloat(lat);
      lng = parseFloat(lng);

      this.mapConfig.center = new google.maps.LatLng(lat, lng);
      this.locationText = text;

      this.markers = [];
      this.markers.push({
        position: {
          lat: lat,
          lng: lng,
        },
        label: {
          color: 'green',
          text: text,
        },
        title: text,
        options: { animation: google.maps.Animation.DROP },
      });    

      // update store count on this location
      this.updateStoreCount();

      this.changeDetectorRef.detectChanges();
    }
}
  