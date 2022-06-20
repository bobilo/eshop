import { UsersFacade } from './../state/users.facade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = 'https://eshop-backend-bonnie.herokuapp.com/api/v1/' + 'users';

    constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }

    updateUser(user: User, userId: string): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
    }

    deleteUser(userId: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.apiURLUsers}/${userId}`);
    }

    getUsersCount(): Observable<unknown> {
        return this.http.get<unknown>(`${this.apiURLUsers}/get/count`);
    }

    initAppSession() {
        this.usersFacade.buildUserSession();
    }

    observeCurrentUser() {
        return this.usersFacade.currentUser$;
    }

    isCurrentUserAuth() {
        return this.usersFacade.isAuthenticated$;
    }
}
