import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CartemptyRoutingModule, routedComponents } from './routes';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CoreModule,
    SharedModule,
    CartemptyRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class CartemptyModule { }
