export class OrderItem {
    constructor(public menu_item_id: number, public quantity: number){}
}

export class OrderRequest {
    discount: number = 0;
    coupon: string;
    special_instructions: string;
    address_id: number;
    store_id: number;
    payment_method_id: number;
    type: string;
    scheduled_on: string;
    items: Array<OrderItem> = [];
}