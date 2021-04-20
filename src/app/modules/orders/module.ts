import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrdersRoutingModule, routedComponents } from './routes';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    CoreModule,
    SharedModule,
    OrdersRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    
  ],
})
export class OrderModule { }
