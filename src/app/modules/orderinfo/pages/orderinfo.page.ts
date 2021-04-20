import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { OrderClient } from 'src/app/core/network/order.client';
import { SettingService } from 'src/app/core/services/setting.service';
import { Order } from 'src/app/shared/models/order.model';
import * as moment from 'moment';

@Component({
  selector: 'orderinfo-page',
  templateUrl: `./orderinfo.page.html`, 
  styleUrls: ['./orderinfo.page.scss'], 
 
})
export class OrderinfoPage implements OnInit {
  private readonly ORDER_STATUSES = ['new','pending', 'cancelled', 'accepted','rejected', 'preparing', 'dispatched', 'intransit', 'complete'];
  orderId: string;
  currency: string;
  order: Order = new Order();

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private orderClient: OrderClient, private route: ActivatedRoute,
    private settingService: SettingService) {
    this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
  }

  ngOnInit() { 
    this.route
    .paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.fetchOrder();
    });
  }

  fetchOrder() {
    if(!this.orderId) {
      return;
    }
    this.orderClient.get(this.orderId).subscribe(res => {
      this.order = res;
      this.currency = this.settingService.getCurrency();
    }, err => {
      console.log(err);
    });
  }

  formatDateTime(date) {
    return moment(date).format('LLL');
  }

  orderStatusActiveTab(tab) {
    if(this.order.status == 'new' || this.order.status == "pending") {
      return ['placed'].indexOf(tab) > -1;
    }

    if(this.order.status == 'accepted' || this.order.status == 'preparing') {
      return ['placed', 'preparing'].indexOf(tab) > -1;
    }

    if(this.order.status == 'dispatched') {
      return ['placed', 'preparing', 'dispatched'].indexOf(tab) > -1;
    }

    if(this.order.status == 'intransit') {
      return ['placed', 'preparing', 'dispatched', 'track'].indexOf(tab) > -1;
    }

    if(this.order.status == 'complete') {
      return ['placed', 'preparing', 'dispatched', 'track', 'delivered'].indexOf(tab) > -1;
    }

    return false;
  }
}
