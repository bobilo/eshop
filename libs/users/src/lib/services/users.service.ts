import { UsersFacade } from './../state/users.facade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@bonnie/users';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';

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

    getUsersCount(): Observable<Object> {
        return this.http.get<Object>(`${this.apiURLUsers}/get/count`);
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
