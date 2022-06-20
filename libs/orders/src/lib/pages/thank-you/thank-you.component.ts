import { Component, OnInit } from '@angular/core';
import { CartService } from '@bonnie/cart';
import { OrdersService } from '../../services/orders.service';

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
