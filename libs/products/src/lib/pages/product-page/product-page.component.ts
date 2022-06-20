
import { Subject, takeUntil } from 'rxjs';
import { Product } from './../../models/Products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartItem, CartService } from '@bonnie/cart';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product;
    endSubs$: Subject<any> = new Subject();
    quantity = 1;
    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this._getProduct(params['productid']);
            }
        });
    }

    private _getProduct(id: string) {
        this.productsService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
            });
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Cart updated` });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
