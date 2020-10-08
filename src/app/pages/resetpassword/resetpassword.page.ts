import {Component, ViewChild} from '@angular/core';
import {AlertController, IonInput, NavController, ViewDidEnter} from '@ionic/angular';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.page.html',
    styleUrls: ['./resetpassword.page.scss'],
})

/**
 * Container necessary for the logic of resetting the password.
 */
export class ResetpasswordPage implements ViewDidEnter {
    emailForPassReset: string;
    errors: Map<string, string> = new Map<string, string>();
    @ViewChild('email') email: IonInput;

    constructor(
        private alertController: AlertController,
        private authService: AuthService,
        private navCtrl: NavController) {
        if (authService.user !== undefined) {
            this.emailForPassReset = this.authService.user.email;
        }
    }

    /**
     * Sets the focus on the E-Mail Input.
     */
    ionViewDidEnter(): void {
        setTimeout(() => this.email.setFocus(), 10);
    }

    /**
     * Takes the given String (E-Mail) and checks the Firestore if a User with that E-Mail is found.
     * Returns either a successful Message with an E-Mail to reset the password or throws an inline-error.
     *
     * @param emailForPassReset is the String that is compared with the Firestore.
     */
    async reset(emailForPassReset: string) {
        this.errors.clear();
        const auth = firebase.auth();
        await this.navCtrl.back();
        await auth.sendPasswordResetEmail(emailForPassReset)
            .then(async () => {
                const alert = await this.alertController.create({
                    mode: 'ios',
                    header: 'Passwort zurückgesetzt',
                    message: 'Wir haben eine E-Mail zum Zurücksetzen deines Passwortes an deine Adresse versandt!',
                    buttons: ['Verstanden']
                });
                await alert.present();
            })
            .catch(async (error) => {
                if (error.code === 'auth/user-not-found') {
                    this.errors.set('wrongData', 'Nutzer nicht gefunden.');
                } else {
                    this.errors.set('wrongData', 'Wende dich an den Admin:\n' + error);
                }
            });
    }
}
