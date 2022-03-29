import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UiModule } from '@bonnie/ui';
import { MessageService } from 'primeng/api';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductsListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes), ButtonModule, CheckboxModule, RatingModule, InputNumberModule, UiModule, ToastModule],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent
    ],
    providers: [MessageService],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent]
})
export class ProductsModule {}
