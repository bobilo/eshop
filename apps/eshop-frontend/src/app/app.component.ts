import { UsersService } from '@bonnie/users';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'eshop-frontend-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'eshop-frontend';
    constructor(private usersService: UsersService) {}
    ngOnInit(): void {
        this.usersService.initAppSession();
    }
}
