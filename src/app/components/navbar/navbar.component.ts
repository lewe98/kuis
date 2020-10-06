import {Component, Input} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

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
    @Input() questionsAvailable = false;

    constructor(public authService: AuthService,
                private router: Router,
                private alertController: AlertController) {
        this.showBack = true;
    }


    stat() {
        const pathname = window.location.pathname;
        if (pathname === '/login' || pathname === '/registrierung') {
            this.router.navigate(['landing']);
        } else if (window.location.pathname === '/quiz' && this.questionsAvailable === true) {
            this.presentAlertBack();
        } else {
            this.router.navigate(['startseite']);
        }
    }

    async presentAlertBack() {
        const alert = await this.alertController.create({
            mode: 'ios',
            header: 'Runde wirklich Abbrechen?',
            message: 'Wenn Sie die Runde abbrechen gehen alle Erfolge verloren.',
            buttons: [
                {
                    text: 'Spiel abbrechen',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.router.navigate(['startseite']);
                    }
                }, {
                    text: 'Weiterspielen',
                    handler: () => {
                    }
                }
            ]
        });

        await alert.present();
    }
}
