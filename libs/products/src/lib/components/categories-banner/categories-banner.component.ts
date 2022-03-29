import { takeUntil, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoriesService } from '@bonnie/products';

@Component({
    selector: 'product-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((cats) => {
              this.categories = cats;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.next(() => {
            return;
        });
        this.endSubs$.complete();
    }
}
