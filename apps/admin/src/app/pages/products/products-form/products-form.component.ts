import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, ProductsService } from '@bonnie/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editMode = false;
    form: FormGroup;
    isSubmitted = false;
    categories = [];
    currentProductId: string;
    imagePreview: string | ArrayBuffer;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.currentProductId = params.id;
                this.productsService.getProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.description.setValue(product.description);
                    this.productForm.richDescription.setValue(product.richDescription);
                    this.productForm.price.setValue(product.price);
                    this.productForm.brand.setValue(product.brand);
                    this.productForm.category.setValue(product.category.id);
                    this.productForm.countInStock.setValue(product.countInStock);
                    this.productForm.isFeatured.setValue(product.isFeatured);
                    this.imagePreview = product.image;
                    this.productForm.image.setValidators([]);
                    this.productForm.image.updateValueAndValidity();
                });
            }
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        } else {
            const productFormData = new FormData();
            Object.keys(this.productForm).map((key) => {
                productFormData.append(key, this.productForm[key].value);
            });
            if (this.editMode) {
                this._updateProduct(productFormData);
            } else {
                this._createProduct(productFormData);
            }
        }
    }

    private _createProduct(productData: FormData) {
        this.productsService.createProduct(productData).subscribe(
            (product) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is created` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created' });
            }
        );
    }

    private _updateProduct(productData: FormData) {
        this.productsService.updateProduct(productData, this.currentProductId).subscribe(
            (product) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is updated` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not updated' });
            }
        );
    }

    onCancel() {}

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imagePreview = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    get productForm() {
        return this.form.controls;
    }
}
