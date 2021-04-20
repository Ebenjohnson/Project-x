import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SearchRoutingModule, routedComponents } from './routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    CoreModule,
    SharedModule,
    SearchRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
    ...routedComponents,
    SidebarComponent,
    ResultsComponent
  ],
  providers: [
    
  ],
})
export class SearchModule { }
