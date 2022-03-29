import { OrdersService, CartService } from '@bonnie/orders';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'orders-thank-you',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
    constructor(private ordersService: OrdersService, private cartService: CartService) {}

    ngOnInit(): void {
        const order = this.ordersService.getCachedOrderData();
        this.ordersService.createOrder(order).subscribe(() => {
            this.cartService.emptyCart();
            this.ordersService.removeCachedOrderData();
        });
    }
}
