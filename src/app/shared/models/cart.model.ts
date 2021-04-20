import { MenuItem } from './menuitem.model';
import { Coupon } from './coupon.model';
import { Address } from './address.model';
import { PaymentMethod } from './paymentmethod.model';

export class CartItem {
    constructor(public menuItem: MenuItem, public quantity: number){}
}

export class CartRestaurant {
    constructor(public id, public name){}
}

export class Cart {
    restaurant: CartRestaurant = null;
    specialInstructions: string;
    items: Array<CartItem> = [];
    tax: number = 0;
    subtotal: number = 0;
    total: number = 0;
    coupon: Coupon = null;
    discount: number = 0;
    addressId: number;
    type: string = 'ASAP';
    scheduledOn: string;
    paymentMethodId: number;
    deliveryFee: number = 0;
}