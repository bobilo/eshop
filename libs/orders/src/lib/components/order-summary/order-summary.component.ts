import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@bonnie/orders';
import { ProductsService } from '@bonnie/products';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    totalPrice: number;
    isCheckout = false;

    constructor(private cartService: CartService, private productsService: ProductsService, private router: Router) {
        this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }

    _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items.map((item) => {
                    this.productsService
                        .getProduct(item.productId)
                        .pipe(take(1))
                        .subscribe((product) => {
                            this.totalPrice += product.price * item.quantity;
                        });
                });
            }
        });
    }
}
