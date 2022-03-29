import { takeUntil, Subject } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@bonnie/products';
import { CartItemDetailed } from '../../models/Cart';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    quantity = 1;
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();
    constructor(private router: Router, private cartService: CartService, private productService: ProductsService, private messageService: MessageService) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
            this.cartItemsDetailed = [];
            this.cartCount = respCart?.items.length ?? 0;
            respCart.items.forEach((cartItem) => {
                this.productService.getProduct(cartItem.productId).subscribe((product) => {
                    this.cartItemsDetailed.push({
                        product: product,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }

    backToShop() {
        this.router.navigate(['/products']);
    }

    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartService.deleteCartItem(cartItem.product.id);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Cart updated` });
    }

    updateCartItemQuantity(event, cartItem: CartItemDetailed) {
        this.cartService.setCartItem(
            {
                productId: cartItem.product.id,
                quantity: event.value
            },
            true
        );
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Cart updated` });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
