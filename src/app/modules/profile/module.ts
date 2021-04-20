import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule, routedComponents } from './routes';
import { ReviewsComponent } from './components/reviews/reviews.component';

@NgModule({
  imports: [
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    CarouselModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset
    }),
    CoreModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ...routedComponents,
    ReviewsComponent
  ],
  providers: [
    
  ],
})
export class ProfileModule { }
