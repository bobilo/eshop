import { LocalstorageService } from './../../services/localstorage.service';
import { Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private localstorageService: LocalstorageService, private router: Router) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginFormGroup.invalid) return;

        const loginData = {
            email: this.loginForm.email.value,
            password: this.loginForm.password.value
        };
        this.authService.login(loginData.email, loginData.password).subscribe(
            (user) => {
                this.authError = false;
                this.localstorageService.setToken(user.token);
                this.router.navigate(['/']);
            },
            (error) => {
                console.log(error.status);
                this.authError = true;
                if (error.error == 'The user not found') {
                    this.errorMessage = 'Wrong Email!';
                } else {
                    this.errorMessage = 'Wrong Password!';
                }
            }
        );
    }
}
