import { Product } from './../../models/Products';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartItem, CartService } from '@bonnie/cart';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product;

    constructor(private cartService: CartService, private messageService: MessageService) {}

    ngOnInit(): void {}

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Cart updated` });
    }
}
