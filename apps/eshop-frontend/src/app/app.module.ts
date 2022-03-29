import { JwtInterceptor } from '@bonnie/users';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsModule } from '@bonnie/products';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { UiModule } from '@bonnie/ui';
import { OrdersModule } from '@bonnie/orders';
import { UsersModule } from '@bonnie/users';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [
        BrowserModule,
        NgxStripeModule.forRoot('pk_test_51JG0akIFCBL0Oy1unKPay7GyMUs2ocksaz3kCODKDlbPT6quonK9z94lpGIsOwaxnJq3x9qYyZn6pYNMo548FK1000y5xiewy8'),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        AccordionModule,
        ProductsModule,
        UiModule,
        OrdersModule,
        UsersModule
    ],
    providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
