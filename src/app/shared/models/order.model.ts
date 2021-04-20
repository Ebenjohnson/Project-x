import { User } from './user.model';
import { Address } from './address.model';
import { Restaurant } from './restaurant.model';
import { PaymentMethod } from './paymentmethod.model';
import { MenuItem } from './menuitem.model';

export class OrderItem {
    quantity: number;
    total: number;
    menuitem: MenuItem;
}

export class DeliveryProfile {
    latitude: string;
    longitude: string;
    user: User;
}

export class Order {
    id: number;
    subtotal: number;
    taxes: number;
    delivery_fee: number;
    total: number;
    discount: number;
    status: string;
    delivery_status: string;
    payment_status: string;
    special_instructions: string;
    address_id: number;
    store_id: number;
    user_id: number;
    delivery_profile_id: number;
    payment_method_id: number;
    type: string;
    scheduled_on: string;
    reject_reason: string;
    user: User;
    address: Address;
    store: Restaurant;
    payment_method: PaymentMethod;
    created_at: string;
    orderitems: Array<OrderItem>;
    delivery_profile: DeliveryProfile;
}