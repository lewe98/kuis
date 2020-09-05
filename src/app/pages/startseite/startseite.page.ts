import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {

    constructor(private router: Router) {
    }

    /**
     * Method navigates the Router to a Page.
     * @param route is the Path to navigate.
     */
    routerNavigate(route: string) {
        this.router.navigate([route]);
    }

}
