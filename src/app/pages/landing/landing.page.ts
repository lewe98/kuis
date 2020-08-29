import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

    slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    constructor(private authService: AuthService,
                private router: Router) {
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    redirectToRegister() {
        this.router.navigate(['/registrierung']);
    }

    googleLogin() {
        this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/startseite']);
        });
    }

}
