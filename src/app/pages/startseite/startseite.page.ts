import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {

    subUser: Subscription;

    constructor(private router: Router,
                private authService: AuthService) {
        if (!this.authService.user) {
            this.subUser = this.authService.findById(localStorage.getItem('userID'))
                .subscribe(u => {
                    this.authService.user = u;
                    this.authService.subUser = this.subUser;
                    this.subUser.unsubscribe();
                });
        }
    }

    /**
     * Method navigates the Router to a Page.
     * @param route is the Path to navigate.
     */
    routerNavigate(route: string) {
        this.router.navigate([route]);
    }
}
