import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService, Category } from '@bonnie/products';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category is deleted` });
                        this._getCategories();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted' });
                    }
                );
            },
            reject: () => {}
        });
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .subscribe((cats) => {
                this.categories = cats;
            });
    }
}
