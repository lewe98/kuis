import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {ToastService} from '../../services/toast/toast.service';
import {Router} from '@angular/router';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {User} from '../../models/user';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.page.html',
    styleUrls: ['./registrierung.page.scss']
})
export class RegistrierungPage implements ViewDidEnter {

    user = new User();
    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('nutzername')
    private nutzernameRef: IonInput;

    constructor(private authService: AuthService,
                private toastService: ToastService,
                private router: Router) {
    }

    async submit() {
        this.errors.clear();
        /*
                if (!this.user.nutzername) {
                    this.errors.set('nutzername', 'Nutzername darf nicht leer sein!');
                }
                if (!this.user.email) {
                    this.errors.set('email', 'Email darf nicht leer sein!');
                }
                if (!this.user.passwort) {
                    this.errors.set('passwort', 'Passwort darf nicht leer sein!');
                }
                if (this.errors.size === 0) {*/


        alert(this.user.nutzername);

        this.authService.register(
            this.user.nutzername,
            this.user.email,
            this.user.passwort
        ).then(() => {
            this.router.navigate(['startseite']);
        });
        // }
    }

    redirectToLogin() {
        this.router.navigate(['login']);
    }

    googleLogin() {
        this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/home']);
        });
    }

    ionViewDidEnter() {
        /*
        this.nutzernameRef.setFocus();
         */
    }


}
