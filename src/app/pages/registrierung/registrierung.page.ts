import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {IonInput, ViewDidEnter} from '@ionic/angular';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.page.html',
    styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements ViewDidEnter {

    nutzername: string;
    email: string;
    passwort: string;
    passwortConfirm: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('focus') private nutzernameRef: IonInput;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    signUp(nutzername, email: string, passwort: string) {
        this.errors.clear();

        if (!nutzername) {
            this.errors.set('nutzername', 'Nutzername darf nicht leer sein!');
        }
        if (!email) {
            this.errors.set('email', 'Email darf nicht leer sein!');
        }
        if (!this.emailIsValid(email)) {
            this.errors.set('email', 'Fehlerhaftes Email Format!');
        }
        if (passwort.length < 6) {
            this.errors.set('passwort', 'Passwort muss mindestens 6 Zeichen besitzen!');
        }
        if (!passwort) {
            this.errors.set('passwort', 'Passwort darf nicht leer sein!');
        }
        if (passwort !== this.passwortConfirm) {
            this.errors.set('passwortConfirm', 'Passwörter stimmen nicht überein!');
        }

        if (this.errors.size === 0) {
            this.authService.signUp(nutzername, email, passwort).then(() =>
                this.router.navigate(['/startseite'])
            );
        }
    }

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    ionViewDidEnter() {
        this.nutzernameRef.setFocus();
    }
}
