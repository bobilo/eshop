import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { JwtInterceptor, UsersModule } from '@bonnie/users';
import { AppRoutingModule } from './app-routing.module';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
];

@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoriesListComponent,
        CategoryFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersListComponent,
        UsersFormComponent,
        OrdersListComponent,
        OrdersDetailComponent
    ],
    imports: [
        BrowserModule,
        NgxStripeModule.forRoot('pk_test_51JG0akIFCBL0Oy1unKPay7GyMUs2ocksaz3kCODKDlbPT6quonK9z94lpGIsOwaxnJq3x9qYyZn6pYNMo548FK1000y5xiewy8'),
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        UsersModule,
        ...UX_MODULE
    ],
    providers: [
        MessageService,
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
