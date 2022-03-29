import { ActivatedRoute } from '@angular/router';
import { Category } from './../../models/Category';
import { CategoriesService } from './../../services/categories.service';
import { takeUntil, Subject } from 'rxjs';
import { ProductsService } from '@bonnie/products';
import { Product } from './../../models/Products';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean;
    endSubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
            params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: string[] | any) {
        this.productsService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    categoryFilter() {
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);
        this._getProducts(selectedCategories);
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }
}
