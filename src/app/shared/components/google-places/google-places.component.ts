import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-google-places',
  templateUrl: `./google-places.component.html`,
  styleUrls: ['./google-places.component.scss'],
})
export class GooglePlacesComponent implements AfterViewInit{
  // https://medium.com/@dhormale/use-google-places-api-autocomplete-using-angular-for-resident-and-office-address-23cc33078e8
  @Input() adressType: string;
  @Output() setLocation: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  @Input() autocompleteInput?: string;

  queryWait: boolean;

  constructor() {

  }
  
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }
  
  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, {
      // componentRestrictions: { country: 'US' },
      // types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }
  
  invokeEvent(place: Object) {
    this.setLocation.emit(place);
  }
}
