import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {

    constructor(public authService: AuthService) {
    }

    /**
     * method to perform the logout for the authenticated user
     */
    handleLogout() {
        this.authService.logOut();
    }

}
