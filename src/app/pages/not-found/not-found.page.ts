import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {

    constructor(private router: Router) {
    }

    /**
     * If a page is not found, the User is redirected to the landing page.
     */
    redirectToHomepage() {
        this.router.navigate(['/landing']);
    }
}
