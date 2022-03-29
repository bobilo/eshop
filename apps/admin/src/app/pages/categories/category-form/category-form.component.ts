import { Category } from '@bonnie/products';
import { CategoriesService } from '@bonnie/products';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, timer} from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html',
    styles: []
})
export class CategoryFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    categoryId: string;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });
        this._checkEditMode();
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.valid) {
            const category: Category = {
                name: this.categoryForm.name.value,
                icon: this.categoryForm.icon.value,
                color: this.categoryForm.color.value
            };
            if (this.editMode) {
                this._updateCategory(this.categoryId, category);
            } else {
                this._createCategory(category);
            }
        } else {
            return;
        }
    }

    onCancel() {
        this.form.reset();
        timer(20)
            .toPromise()
            .then(() => {
                this.location.back();
            });
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.categoryId = params.id;
                this.categoriesService.getCategory(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                    this.categoryForm.color.setValue(category.color);
                });
            }
        });
    }

    private _createCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is created` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created' });
            }
        );
    }

    private _updateCategory(categoryId: string, category: Category) {
        this.categoriesService.updateCategory(categoryId, category).subscribe(
            (category) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is updated` });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not updated' });
            }
        );
    }

    get categoryForm() {
        return this.form.controls;
    }
}
