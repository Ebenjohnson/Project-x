import { Component, OnInit } from '@angular/core';
import { StripeService, Elements, Element as StripeElement, ElementsOptions, Token } from "ngx-stripe";
import * as moment from 'moment';
import { UserClient } from 'src/app/core/network/user.clien';
import { Address } from 'src/app/shared/models/address.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { PaymentMethod } from 'src/app/shared/models/paymentmethod.model';
import { PaymentMethodClient } from 'src/app/core/network/paymentmethod.client';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/core/services/setting.service';
import { Constant } from 'src/app/shared/models/constant.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrderClient } from 'src/app/core/network/order.client';

export class CartMenuItem {
  constructor(public menuItem, public quantity){}
}

declare var $ : any;

@Component({
  selector: 'checkout-page',
  templateUrl: `./checkout.page.html`,
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit{
  private allowedPaymentMethods = ["cod", "stripe"];
  minDateTimeForSchedule = new Date();
  addresses: Array<Address> = [];
  address: Address = new Address();
  paymentMethod: PaymentMethod = new PaymentMethod();
  cart: Cart = new Cart();
  paymentMethods: Array<PaymentMethod> = [];
  orderType = {"asap": Constant.ORDER.TYPE_ASAP, "later": Constant.ORDER.TYPE_LATER};
  selectedAddressId: number = 0;
  selectedPaymentMethod: PaymentMethod = null;
  selectedOrderType: string = Constant.ORDER.TYPE_ASAP;
  selectedScheduledTime: string;
  selectedScheduledTimeFormatted: string;
  orderPlaced: boolean = false;
  loading: boolean = false;
  currency: string;
  order: Order;
  deliveryFee: number;

  // stripe
  card: StripeElement;
  elements: Elements;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  stripeToken: Token = null;
  
  constructor(private userClient: UserClient, public localStorageService: LocalStorageService, 
    private cartService: CartService, private paymentMethodClient: PaymentMethodClient,
    private authenticationService: AuthenticationService, private router: Router,
    private settingService: SettingService, private orderClient: OrderClient,
    private stripeService: StripeService){
      this.authenticationService.loggedOut$.subscribe(_ => this.router.navigate(['signin'], { queryParams: { returnUrl: this.router.url }}));
      this.cart = cartService.getCart();
  }
  
  ngOnInit() {
    // get address list
    this.userClient.addressList().subscribe(_ => {this.addresses = _});
    
    // get payment methods list
    this.paymentMethodClient.list().subscribe(_ => this.paymentMethods = _.filter(paymentMethod => this.allowedPaymentMethods.indexOf(paymentMethod.slug) > -1));

    // get currency
    this.currency = this.settingService.getCurrency();

    // stripe
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            hidePostalCode: true,
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#stripe-card-element');
        }
      });
  }
  
  getAddress($event: Address) {
    this.updateAddressList($event);
  }
  
  setAddress(address: Address) {
    if(address == null) {
      this.address = new Address();
    } else {
      this.address = address;
    }
  }

  placeOrder(event) {
    if(this.loading) return false;

    if(!this.selectedAddressId) {
      $('#validateAddressModal').modal('show');
      return false;
    }
    if(!this.selectedPaymentMethod) {
      $('#validatePaymentModal').modal('show');
      return false;
    }
    if(this.selectedOrderType == Constant.ORDER.TYPE_LATER && !this.selectedScheduledTime) {
      $('#validateScheduleTimeModal').modal('show');
      return false;
    }

    if(this.selectedPaymentMethod.slug == 'stripe') {
      this.createStripeToken().subscribe(_ => {
        console.log(_);
        if(_.token) {
          this.stripeToken = _.token;
          this._createOrder();
        } else {
          $('#validateStripeCardModal').modal('show');
        }
      });
    } else {
      this._createOrder();
    }
    
    return false;
  }

  onScheduleTimeChange($event){
    this.selectedScheduledTime = moment($event.value).format('YYYY-MM-DD HH:mm:ss');
    this.selectedScheduledTimeFormatted = moment($event.value).format('LLL');
  }
  
  addressChanged(event) {
    // calculate delivery fee when address changed
    this.orderClient.calculateDeliveryFee(this.selectedAddressId, this.cart.restaurant.id).subscribe(
      _ => this.cartService.applyDeliveryFee(_)
    );
  }

  private _createOrder()
  {
    this.loading = true;

    // if order is already placed and we need to retry just payment
    if(this.order) {
      if(this.selectedPaymentMethod.slug == 'stripe') {
        this.paymentStripe();
      }
    } else {
      this.cartService.placeOrder(this.selectedAddressId, this.selectedPaymentMethod?.id, this.selectedOrderType, this.selectedScheduledTime)
        .subscribe(
          (order: Order) =>  {
            this.order = order;
            if(this.selectedPaymentMethod.slug == 'stripe') {
              this.paymentStripe();
            } else {
              this.onOrderComplete();
            }
          },
          err => { this.loading = false; console.log(err) }
        );
    }
  }
  
  private updateAddressList(address: Address) {
    let isUpdated = false;
    for (let i = 0; i < this.addresses.length; i++) {
      if(address.id == this.addresses[i].id) {
        this.addresses[i] = address;
        isUpdated = true;
        break;
      }
    }
    
    if(!isUpdated) {
      this.addresses.push(address);
    }
  }

  private onOrderComplete()
  {
      this.orderPlaced = true;
      this.loading = false;
      this.cartService.clearCart();
  }

  private onPaymentFailed()
  {
    this.loading = false;
    $('#stripePaymentFailedModal').modal('show');
  }

  private paymentStripe()
  {
      this.orderClient.paymentStripe(this.order.id, this.stripeToken.id).subscribe(_ => {
        this.onOrderComplete();
      }, err => this.onPaymentFailed());
  }

  private createStripeToken()
  {
    const name = this.authenticationService.getCurrentUser().name;
    return this.stripeService.createToken(this.card, { name })
  }
}
