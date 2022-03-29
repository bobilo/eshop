import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@bonnie/orders';
import { ProductsService } from '@bonnie/products';
import { UsersService } from '@bonnie/users';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    userCount: number;
    ordersCount: number;
    totalSales: number;
    productsCount: number;

    constructor(private usersService: UsersService, private ordersService: OrdersService, private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getUsersCount();
        this._getOrdersCount();
        this._getTotalSales();
        this._getProductsCount();
    }

    private _getUsersCount() {
        this.usersService.getUsersCount().subscribe((userCount) => {
            this.userCount = userCount['userCount'];
        });
    }

    private _getOrdersCount() {
        this.ordersService.getOrdersCount().subscribe((ordersCount) => {
            this.ordersCount = ordersCount['ordersCount'];
        });
    }

    private _getTotalSales() {
        this.ordersService.getTotalSales().subscribe((totalSales) => {
            this.totalSales = totalSales['totalSales'];
        });
    }

    private _getProductsCount() {
        this.productsService.getProductsCount().subscribe((productsCount) => {
            this.productsCount = productsCount['productCount'];
        });
    }
}
