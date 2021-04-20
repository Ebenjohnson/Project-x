import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppConfigService } from 'src/app/app-config.service';
import { Observable, of, pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RestaurantClient, RestaurantResponse } from 'src/app/core/network/restaurant.client';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/shared/models/menuitem.model';
import { SettingService } from 'src/app/core/services/setting.service';
import { RestaurantService } from 'src/app/core/services/restaurant.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/shared/models/cart.model';
import { Coupon } from 'src/app/shared/models/coupon.model';

declare var $ : any;

export class CartMenuItem {
  constructor(public menuItem, public quantity){}
}

@Component({
  selector: 'profile-page',
  templateUrl: `./profile.page.html`,
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy{
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  restaurant: Restaurant = new Restaurant();
  restaurantId: string;
  cartMenuItems: Array<CartMenuItem> = [];
  currency: string;
  checkoutEnabled = false;
  loading: boolean = true;
  noResult: boolean = false;
  public cart$: Observable<Cart> = of(new Cart());
  public cart: Cart;
  
  constructor(public localStorageService: LocalStorageService, private appConfigService: AppConfigService, private restaurantClient: RestaurantClient,
    private route: ActivatedRoute, private settingService: SettingService, private restaurantService: RestaurantService,
    private cartService: CartService, private router: Router){
      this.cart$ = cartService.getCart$();
      this.cart$.subscribe(_ => {
        this.cart = _;
        this.enableCheckout();
      });
    }
    
  ngOnInit() {
    this.route
    .paramMap.subscribe(params => {
      this.restaurantId = params.get('id');
      this.fetchRestaurant();
    });
  }

  ngOnDestroy() {
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
  }
  
  fetchRestaurant() {
    if(!this.restaurantId) {
      return;
    }
    this.restaurantClient.get(this.restaurantId).pipe( takeUntil(this.ngUnsubscribe) )
    .subscribe(res => {
      this.loading = false;
      this.restaurant = res.store;
      this.buildCartMenuItem(res.menu_items);
      this.currency = this.settingService.getCurrency();
    }, err => {
      this.loading = false;
      this.noResult = true;
      console.log(err);
    });
  }
  
  menuItemsByCategory(categoryId) {
    let cartMenuItems: Array<CartMenuItem> = [];
    for (let i = 0; i < this.cartMenuItems.length; i++) {
      for (let j = 0; j < this.cartMenuItems[i].menuItem.categories.length; j++) {
        if(this.cartMenuItems[i].menuItem.categories[j].id == categoryId) {
          cartMenuItems.push(this.cartMenuItems[i]);
        }
      }
    }
    return cartMenuItems;
  }
  
  getCategoriesTitleForMenuItem(menuItem: MenuItem){
    return this.restaurantService.categoriesTitleForMenuItem(menuItem);
  }
  
  addToCart(menuItem: MenuItem, quantity: number) {
    if(this.cart.restaurant &&  this.cart.restaurant.id != this.restaurantId) {
      $('#existingItemsInCartModal').modal('show');
      return;
    }
    let currentQuantity = this.cartService.addToCart(this.restaurant, menuItem, quantity);
    this.updateCartMenuItemQuantity(menuItem, currentQuantity);
    this.enableCheckout();
  }
  
  removeFromCart(menuItem: MenuItem) {
    this.cartService.removeFromCart(menuItem);
    this.updateCartMenuItemQuantity(menuItem, 0);
    this.enableCheckout();
  }

  clearCart() {
    this.cartService.clearCart();
    $('#existingItemsInCartModal').modal('hide');
  }
  
  enableCheckout() {
    let minimumOrder = this.restaurant.minimum_order;
    if(minimumOrder) {
      if(minimumOrder <= this.cart.subtotal) {
        this.checkoutEnabled = true;
      } else {
        this.checkoutEnabled = false;
      }
    } else {
      this.checkoutEnabled  = true;
    }
  }
  
  applyCoupon(coupon: Coupon) {
    this.cartService.applyCoupon(coupon);
    $('#coupon_code_modal').modal('hide');
  }
  
  removeCoupon() {
    this.cartService.applyCoupon(null);
  }

  toggleFavourite() {
    this.restaurantClient.toggleFavourite(this.restaurant.id).subscribe(_ => this.restaurant.favourite = _);
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }
  
  private buildCartMenuItem(menuItems: Array<MenuItem>) {
    menuItems.forEach((menuItem:MenuItem) => {
      // check quantity in cart
      let quantity = this.cartService.getQuantityFromCart(menuItem);
      this.cartMenuItems.push(new CartMenuItem(menuItem, quantity));
    });
  }
  
  private updateCartMenuItemQuantity(menuItem: MenuItem, quantity) {
    this.cartMenuItems.forEach((item: CartMenuItem) => {
      if(item.menuItem.id == menuItem.id) {
        item.quantity = quantity;
      }
    });
  }
}
  