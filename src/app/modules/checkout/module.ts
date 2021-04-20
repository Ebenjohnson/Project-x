import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CheckoutRoutingModule, routedComponents } from './routes';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxStripeModule.forRoot('pk_live_lpKfxpdSIAZMGR8EguUJVqLn005xOwTCms'),
    CoreModule,
    SharedModule,
    CheckoutRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    
  ],
})
export class CheckoutModule { }
