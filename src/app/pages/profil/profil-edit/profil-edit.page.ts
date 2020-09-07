import {Component, ViewChild} from '@angular/core';
import {IonInput, ModalController, ViewDidEnter} from '@ionic/angular';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-profil-edit',
    templateUrl: './profil-edit.page.html',
    styleUrls: ['./profil-edit.page.scss'],
})
export class ProfilEditPage implements ViewDidEnter {

    user: User;
    passwortConfirm: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('focus') private nutzernameRef: IonInput;

    constructor(private authService: AuthService,
                private modalController: ModalController) {
        this.user = this.authService.getUser();
    }

    save(nutzername, email: string, passwort: string) {
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
            this.authService.updateProfile(this.user);
            this.dismiss();
        }
    }

    emailIsValid(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    dismiss() {
        this.modalController.dismiss();
    }

    ionViewDidEnter() {
        this.nutzernameRef.setFocus();
    }

}
