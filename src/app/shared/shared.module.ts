import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppinfoComponent } from './components/appinfo/appinfo.component';
import { GooglePlacesComponent } from './components/google-places/google-places.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from './components/ratings/ratings.component';
import { AddressComponent } from './components/address/address.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GoogleMapsModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        AppinfoComponent,
        GooglePlacesComponent,
        LoginComponent,
        RatingsComponent,
        AddressComponent,
        CouponComponent
    ],
    providers: [
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AppinfoComponent,
        GooglePlacesComponent,
        LoginComponent,
        RatingsComponent,
        AddressComponent,
        CouponComponent,
    ]
})
export class SharedModule { 

}
