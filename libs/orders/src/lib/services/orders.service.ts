import { OrderItem } from './../models/OrderItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '@env/environment';
import { StripeService } from 'ngx-stripe';
import { Order } from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders';
    constructor(private http: HttpClient, private stripeService: StripeService) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order);
    }

    updateOrder(orderId: string, orderStatus: { status: string }): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
    }

    deleteOrder(orderId: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.apiURLOrders}/${orderId}`);
    }

    getOrdersCount(): Observable<Object> {
        return this.http.get<Object>(`${this.apiURLOrders}/get/count`);
    }

    getTotalSales(): Observable<Object> {
        return this.http.get<Object>(`${this.apiURLOrders}/get/totalsales`);
    }

    createCheckoutSession(orderItem: OrderItem[]) {
        return this.http.post(`${this.apiURLOrders}/create-checkout-session`, orderItem).pipe(
            switchMap((session: { id: string }) => {
                return this.stripeService.redirectToCheckout({ sessionId: session.id });
            })
        );
    }

    cacheOrderData(order: Order) {
        localStorage.setItem('orderData', JSON.stringify(order));
    }

    getCachedOrderData(): Order {
        return JSON.parse(localStorage.getItem('orderData'));
    }

    removeCachedOrderData() {
        localStorage.removeItem('orderData');
    }
}
