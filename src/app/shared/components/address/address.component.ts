import { Component, EventEmitter, Output, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Address } from '../../models/address.model';
import { UserClient } from 'src/app/core/network/user.clien';
import { AddressRequest } from '../../models/address.request.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocationService } from 'src/app/core/services/location.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

declare var $ : any;

@Component({
  selector: 'app-address',
  templateUrl: `./address.component.html`,
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnDestroy {
  @Input() address: Address;
  @Output() setAddress: EventEmitter<Address> = new EventEmitter();
  markers = [];
  loadingLocation = false;
  
  mapConfig = {
    zoom: 12,
    center: null,
    options: {
      zoomControl: true,
      mapTypeId: 'hybrid',
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    }
  };
  
  constructor(private userClient: UserClient, private localStorageService: LocalStorageService,
    private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
  }
  
  ngOnChanges(changes) {
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
    this.address = changes.address.currentValue;
    if(this.address && this.address.latitude) {
      this.onLocationChange(this.address.latitude, this.address.longitude, this.address.address);
    } else {
      let location = this.localStorageService.getLocation();
      this.address = new Address();
      this.address.address = location.text;
      this.address.latitude = location.lat;
      this.address.longitude = location.lng;
      this.onLocationChange(location.lat, location.lng, location.text);
    }
  }

  ngOnDestroy() {
    console.log("destroying");
  }

  locate() {
    this.loadingLocation = true;
    this.locationService.locate((lat, lng, text) => {
      this.onLocationChange(lat, lng, text);
    });
  }
  
  getLocation($event) {
    this.onLocationChange($event.geometry.location.lat(), $event.geometry.location.lng(), $event.formatted_address);
  }
  
  saveAddress() {
    let addressRequest = new AddressRequest();
    addressRequest.title = this.address.title;
    addressRequest.address = this.address.address;
    addressRequest.latitude = this.address.latitude;
    addressRequest.longitude = this.address.longitude;
    if(this.address.id) {
      // update address
      this.userClient.addressUpdate(this.address.id, addressRequest).subscribe(_ => {
        this.address = _;
        this.onSaveAddress();
      });
    } else {
      // create address
      this.userClient.addressSave(addressRequest).subscribe(_ => {
        this.address = _;
        this.onSaveAddress();
      });
    }
  }
  
  isFormValid() {
    return this.address.address && this.address.title;
  }
  
  invokeEvent(address: Address) {
    this.setAddress.emit(address);
  }

  onMapClick(event) {
    this.locationService.reverseGeocode(event.latLng.lat(), event.latLng.lng(), (lat, lng, text) => {
      this.onLocationChange(lat, lng, text);
    });
  }

  private onSaveAddress() {
    this.invokeEvent(this.address);
    $('#add_address_modal').modal('hide');
  }

  private onLocationChange(lat, lng, text) {
    this.loadingLocation = false;
    
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    this.address.address = text;
    this.address.latitude = lat;
    this.address.longitude = lng;

    this.mapConfig.center = new google.maps.LatLng(lat, lng);

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

    this.changeDetectorRef.detectChanges();
  }
}
