import { CartService } from '../../../cart/src/lib/services/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { MessageService } from 'primeng/api';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@bonnie/users';

const ordersRoutes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
      path: 'checkout',
      canActivate: [AuthGuard],
        component: CheckoutPageComponent
    },
    {
        path: 'success',
        component: ThankYouComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ordersRoutes),
        BadgeModule,
        ButtonModule,
        InputNumberModule,
        ToastModule,
        DropdownModule,
        InputSwitchModule,
        InputMaskModule,
        InputTextModule
    ],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent],
    providers: [MessageService],
    exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
