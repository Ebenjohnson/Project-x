import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/shared/models/coupon.model';
import { CouponClient } from 'src/app/core/network/coupon.client';

declare var $ : any;

@Component({
  selector: 'offers-page',
  templateUrl: `./offers.page.html`, 
  styleUrls: ['./offers.page.scss'], 
 
})
export class OffersPage implements OnInit {  
  coupons: Array<Coupon> = [];
  totalResults = 0;
  currentPage = 1;
  lastPage = 1;
  loading = true;
  noResult = false;

  constructor(private router: Router, private couponClient: CouponClient) {
  }

  ngOnInit() {
    this.fetchCoupons(this.currentPage);
  }

  fetchCoupons(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.couponClient.list(this.currentPage).subscribe(res => {
      this.loading = false;
      this.totalResults = res.total;
      if(page == 1) {
        if(res.data.length == 0) {
          this.noResult = true;
        }
        this.coupons = res.data;
      } else {
        this.coupons.push(...res.data);
      }
      this.lastPage = res.last_page;
    }, err => {
      this.loading = false;
      this.noResult = true;
      console.log(err);
    });
  }

  copyCode(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
