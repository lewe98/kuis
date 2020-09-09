import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {

    subUser: Subscription;

    constructor(private router: Router,
                private authService: AuthService,
                private toastService: ToastService) {
        this.toastService.presentLoading('Bitte warten...').then(() => {
            if (this.authService.user === undefined) {
                this.subUser = this.authService.findById(localStorage.getItem('userID'))
                    .subscribe(async u => {
                        this.authService.user = await u;
                        this.authService.subUser = await this.subUser;
                        await this.subUser.unsubscribe();
                        await this.toastService.dismissLoading();
                    });
            }
        });
    }

    /**
     * Method navigates the Router to a Page.
     * @param route is the Path to navigate.
     */
    routerNavigate(route: string) {
        this.router.navigate([route]);
    }
}
