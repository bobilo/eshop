import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bonnie/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private productService: ProductsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts() {
        this.productService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(productId).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product is deleted` });
                        this._getProducts();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not deleted' });
                    }
                );
            },
            reject: () => {}
        });
    }
}
