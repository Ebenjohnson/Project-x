import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/core/services/setting.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { OrderClient } from 'src/app/core/network/order.client';
import { Order } from 'src/app/shared/models/order.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

declare var $ : any;

@Component({
  selector: 'orders-page',
  templateUrl: `./orders.page.html`,
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit{
  readonly TAB_PENDING = 'pending';
  readonly TAB_PAST = 'past';
  orders: Array<Order>;
  totalResults = 0;
  currentPage = 1;
  lastPage = 1;
  loading = true;
  noResult = false;
  currency: string;
  currentTab: string = this.TAB_PENDING;

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private orderClient: OrderClient, private settingService: SettingService){
    this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
  }

  ngOnInit() {
    this.currency = this.settingService.getCurrency();
    this.fetchOrders(this.currentPage);
  }
  
  changeTab(tab: string) {
    this.currentTab = tab;
    this.fetchOrders(this.currentPage);
  }

  fetchOrders(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.orderClient.listOrder(this.currentPage).subscribe(res => {
      this.loading = false;
      this.totalResults = res.total;
      if(page == 1) {
        if(res.data.length == 0) {
          this.noResult = true;
        }
        this.orders = res.data;
      } else {
        this.orders.push(...res.data);
      }
      this.lastPage = res.last_page;
    }, err => {
      this.loading = false;
      this.noResult = true;
      console.log(err);
    });
  }

  onScroll() {
    if(this.currentPage == this.lastPage) return;
    this.fetchOrders(this.currentPage+1);
  }

  formatDateTime(date) {
    return moment(date).format('LLL');
  }
    ratingIcon1 = false;
    ratingIcon2 = false;
    ratingIcon3 = false;
    ratingIcon4 = false;
    ratingIcon5 = false;
 
	
 toggleRatingIcon1(){
   this.ratingIcon1 = !this.ratingIcon1;
   } 
 toggleRatingIcon2(){
   this.ratingIcon2 = !this.ratingIcon2;
   }
 toggleRatingIcon3(){
   this.ratingIcon3 = !this.ratingIcon3;
   }
 toggleRatingIcon4(){
   this.ratingIcon4 = !this.ratingIcon4;
   } 
 toggleRatingIcon5(){
   this.ratingIcon5 = !this.ratingIcon5;
   }
   
    
	
}
