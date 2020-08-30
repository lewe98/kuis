import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {IonInput, ModalController, ViewDidEnter} from '@ionic/angular';
import {PrivacyPage} from '../legal/privacy/privacy.page';
import {TermsPage} from '../legal/terms/terms.page';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.page.html',
    styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements OnInit, ViewDidEnter {

    nutzername: string;
    email: string;
    passwort: string;
    passwortConfirm: string;
    isOnline: boolean;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('focus') private nutzernameRef: IonInput;

    constructor(private authService: AuthService,
                private router: Router,
                public modalController: ModalController) {
    }

    ngOnInit() {
        this.isOnline = false;
        // If an user is found in Storage
        this.isOnline = (sessionStorage.getItem('userID') !== null) || (localStorage.getItem('userID') !== null);
        // dont allows to nav to loginpage while log in;
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
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

    /**
     * Method to display terms of use
     */
    async showTermsModal() {
        const modal = await this.modalController.create({
            component: TermsPage
        });
        return await modal.present();
    }

    /**
     * Method to display privacy policy
     */
    async showPrivacyModal() {
        const modal = await this.modalController.create({
            component: PrivacyPage
        });
        return await modal.present();
    }

    ionViewDidEnter() {
        this.nutzernameRef.setFocus();
    }
}
