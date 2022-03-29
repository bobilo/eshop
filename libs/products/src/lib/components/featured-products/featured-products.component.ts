import { takeUntil, Subject } from 'rxjs';
import { ProductsService } from '@bonnie/products';
import { Product } from './../../models/Products';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    featuredProducts: Product[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this.productsService
            .getFeaturedProducts(4)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => {
                this.featuredProducts = products;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
