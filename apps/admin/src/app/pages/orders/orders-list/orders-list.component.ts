import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bonnie/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ORDER_STATUS } from '@bonnie/orders';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    private _getOrders() {
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders;
        });
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService.deleteOrder(orderId).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order is deleted` });
                        this._getOrders();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order is not deleted' });
                    }
                );
            },
            reject: () => {}
        });
    }
}
