import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CouponClient } from 'src/app/core/network/coupon.client';
import { HttpErrorResponse } from '@angular/common/http';
import { Coupon } from '../../models/coupon.model';

declare var $ : any;

@Component({
  selector: 'app-coupon',
  templateUrl: `./coupon.component.html`,
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent {
  @Output() setCoupon: EventEmitter<any> = new EventEmitter();

  code: string = null;
  couponError: string = null;

  constructor(private couponClient: CouponClient) {
  }

  applyCoupon() {
    this.couponClient.validateCouponCode(this.code).subscribe(_ => {
      this.invokeEvent(_);
    }, (err: HttpErrorResponse) => {
      let couponError = "Unable to appply coupon";
      if(err?.status == 422) {
        if(err.error.errors.code) {
          couponError = err.error.errors.code[0];
        }
      }
      this.couponError = couponError;
    });
  }

  invokeEvent(coupon: Coupon) {
    this.setCoupon.emit(coupon);
  }
}
