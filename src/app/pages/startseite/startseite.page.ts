import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    routerNavigate(route: string) {
        this.router.navigate([route]);
    }

}
