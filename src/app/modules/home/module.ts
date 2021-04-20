import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeRoutingModule, routedComponents } from './routes';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { HowitworksComponent } from './components/howitworks/howitworks.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { PopularComponent } from './components/popular/popular.component';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    CategoriesComponent,
    HowitworksComponent,
    FeaturedComponent,
    PopularComponent
  ],
  providers: [
    
  ],
})
export class HomeModule { }
