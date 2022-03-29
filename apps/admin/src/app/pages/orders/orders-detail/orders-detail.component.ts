import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bonnie/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ORDER_STATUS } from '@bonnie/orders';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order;
    orderStatuses = [];
    selectedStatus: string;
    endsubs$: Subject<any> = new Subject();

    constructor(private ordersService: OrdersService, private route: ActivatedRoute, private messageService: MessageService) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this.route.params.subscribe((params) => {
            if (params.id) {
                this._getOrder(params.id);
            }
        });
    }

    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label
            };
        });
    }

    private _getOrder(orderId: string) {
        this.ordersService.getOrder(orderId).subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
        });
    }
    onStatusChange(event) {
        this.ordersService.updateOrder(this.order.id, { status: event.value }).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order status is updated` });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order status is not updated' });
            }
        );
    }
}
