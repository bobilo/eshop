import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bonnie/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject } from 'rxjs';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete User',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User is deleted` });
                        this._getUsers();
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not deleted' });
                    }
                );
            },
            reject: () => {}
        });
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }

    getCountryName(countryCode: string) {
        return countriesLib.getName(countryCode, 'en');
    }
}
