import {Component, Input} from '@angular/core';
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
 */
export class NavbarComponent {
    @Input() name: string;
    @Input() showLogout: boolean;

    constructor() {
    }


}
