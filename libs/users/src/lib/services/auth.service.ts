import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = 'https://eshop-backend-bonnie.herokuapp.com/api/v1/' + 'users';

    constructor(private http: HttpClient, private localstorageService: LocalstorageService, private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
    }

    logout() {
        this.localstorageService.removeToken();
        this.router.navigate(['/login']);
    }
}
