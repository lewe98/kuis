import {Component, Input} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

/**
 * Manages the inputs that are necessary for the correct display of the Navbar.
 *
 * @param name: Manages the title of the page the navbar is displayed on. The title will be displayed centered in the Navbar.
 * @param showLogout: Either displays an additional Logout-Button in the HTML or not. Uses the logout-component.
 * @param showLogout: Displays the back button.
 */
export class NavbarComponent {
    @Input() name: string;
    @Input() showLogout: boolean;
    @Input() showBack: boolean;

    defaultHref = 'startseite';


    constructor(public authService: AuthService,
                private router: Router) {
        this.showBack = true;
        if (window.location.pathname === '/login' || window.location.pathname === '/registrierung') {
            this.defaultHref = 'landing';
        }
    }

    stat() {
        if (window.location.pathname === '/statistik') {
            this.router.navigate(['startseite']);
        }
    }
}
