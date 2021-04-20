import { Injectable } from '@angular/core';
import { Cart, CartItem, CartRestaurant } from 'src/app/shared/models/cart.model';
import { MenuItem } from 'src/app/shared/models/menuitem.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingService } from './setting.service';
import { Constant } from 'src/app/shared/models/constant.model';
import { LocalStorageService } from './local-storage.service';
import { Coupon } from 'src/app/shared/models/coupon.model';
import { Restaurant } from 'src/app/shared/models/restaurant.model';
import { OrderClient } from '../network/order.client';
import { Order } from 'src/app/shared/models/order.model';
import { OrderRequest, OrderItem } from 'src/app/shared/models/order.request.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(new Cart());
    private cart: Cart = new Cart();
    
    constructor(private settingService: SettingService, private localStorageService: LocalStorageService,
        private orderClient: OrderClient) {
        this.cart = localStorageService.getCart();
        this.cartSubject.next(this.cart);
    }
    
    addToCart(restaurant: Restaurant, menuItem: MenuItem, quantity: number) {
        let currentQuantity = 0;
        let currentCartItem = null;
        this.cart.items.forEach((cartItem:CartItem) => {
            if(menuItem.id == cartItem.menuItem.id) {
                currentCartItem = cartItem;
                currentQuantity = cartItem.quantity;
                currentQuantity += quantity;
                if(currentQuantity < 0) {
                    currentQuantity = 0;
                    return;
                }

                if(currentQuantity == 0) {
                    // remove item from cart
                    this.removeFromCart(menuItem);
                    return;
                }
                cartItem.quantity = currentQuantity;
                
                // update cart
                this.updateCart();
            }
        });
        
        if(!currentCartItem && quantity > 0) {
            // if we are adding item in cart for first time
            this.cart.restaurant = new CartRestaurant(restaurant.id, restaurant.name);
            this.cart.items.push(new CartItem(menuItem, quantity)); 
            currentQuantity = quantity;
            // update cart
            this.updateCart();
        }
        
        return currentQuantity;
    }
    
    removeFromCart(menuItem: MenuItem) {
        for (let i = 0; i < this.cart.items.length; i++) {
            if(menuItem.id == this.cart.items[i].menuItem.id) {
                // remove item from cart
                this.cart.items.splice(i, 1);
                
                // update cart
                this.updateCart();
                
                break;
            }
        }
    }
    
    getCart$():Observable<Cart> {
        return this.cartSubject;
    }
    
    getCart(): Cart {
        return this.cart;
    }
    
    getQuantityFromCart(menuItem: MenuItem) {
        let quantity = 0;
        this.cart.items.forEach((item: CartItem) => {
            if(item.menuItem.id == menuItem.id) {
                quantity = item.quantity
            }
        });
        return quantity;
    }
    
    applyCoupon(coupon: Coupon) {
        this.cart.coupon = coupon;
        this.updateCart();
    }

    applyDeliveryFee(deliveryFee: number) {
        this.cart.deliveryFee = deliveryFee;
        this.updateCart();
    }

    clearCart() {
        this.cart.items = [];
        this.updateCart();
    }

    placeOrder(addressId: number, paymentMethodId: number, type: string, scheduledOn: string): Observable<Order> {
        let orderRequest: OrderRequest = new OrderRequest();
        orderRequest.discount = this.cart.discount;
        if(this.cart.coupon) {
            // if coupon is applied
            orderRequest.coupon = this.cart.coupon.code;
        }
        orderRequest.special_instructions = this.cart.specialInstructions;
        orderRequest.address_id = addressId;
        orderRequest.store_id = this.cart.restaurant.id;
        orderRequest.payment_method_id = paymentMethodId;
        orderRequest.type = type;
        orderRequest.scheduled_on = scheduledOn;
        for (let i = 0; i < this.cart.items.length; i++) {
            orderRequest.items.push(new OrderItem(this.cart.items[i].menuItem.id, this.cart.items[i].quantity));
        }
        return this.orderClient.createOrder(orderRequest);
    }
    
    private updateCart() {
        // if there is no item in cart at this moment, clear cart
        if(this.cart.items.length == 0) {
            this.cart.restaurant = null;
            this.cart.specialInstructions = null;
            this.cart.coupon = null;
        }

        // calculate subtotal
        this.cart.subtotal = 0;
        this.cart.items.forEach((item: CartItem) => {
            this.cart.subtotal += item.menuItem.price * item.quantity;
        });
        this.cart.subtotal = Number.parseFloat(this.cart.subtotal.toFixed(2));
        
        // calculate discount
        this.cart.discount = Number.parseFloat(this.calculateCouponValue().toFixed(2));
        
        // calculate tax
        this.cart.tax = Number.parseFloat(this.calculateTaxValue().toFixed(2));
        
        // calculate total
        this.cart.total = Number.parseFloat((this.cart.subtotal + this.cart.tax + this.cart.deliveryFee - this.cart.discount).toFixed(2));
        
        // save cart in local storage
        this.localStorageService.setCart(this.cart);
        
        // notify cart update
        this.cartSubject.next(this.cart);
    }

    private calculateCouponValue(): number {
        return (this.cart.coupon ? this.cart.coupon.type == 'percent' ? (this.cart.subtotal * Number(this.cart.coupon.reward) / 100) : Number(this.cart.coupon.reward) : 0);
    }

    private calculateTaxValue(): number {
        let taxPercent = Number.parseFloat(this.settingService.getByKey(Constant.SETTINGS.TAX_IN_PERCENT));
        return this.cart.subtotal * (taxPercent/100)
    }
}