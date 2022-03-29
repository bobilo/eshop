import { Component } from '@angular/core';
import { AuthService } from '@bonnie/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    constructor(private authService: AuthService) {}


    logoutUser() {
        console.log('logout activated');
        this.authService.logout();
    }
}
