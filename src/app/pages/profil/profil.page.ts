import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {AlertController, ModalController} from '@ionic/angular';
import {ProfilEditPage} from './profil-edit/profil-edit.page';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Subscription} from 'rxjs';
import {ToastService} from '../../services/toast/toast.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss']
})
export class ProfilPage {

    user: User;
    subUser: Subscription;
    hasVerified = true;

    constructor(public authService: AuthService,
                private toastService: ToastService,
                private modalController: ModalController,
                private alertController: AlertController,
                private iab: InAppBrowser) {
        this.user = this.authService.getUser();
        this.authService.loadPageSubscription(u => this.user = u);
        this.hasVerified = firebase.auth().currentUser.emailVerified;
    }

    // hasVerified2 = this.user.isVerified;

    openGoogleEdit() {
        this.iab.create('https://myaccount.google.com/');
    }

    async showEditModal() {
        if (this.hasVerified) {
            const modal = await this.modalController.create({
                component: ProfilEditPage
            });
            return await modal.present();
        } else {
            const alert = await this.alertController.create({
                mode: 'ios',
                header: 'Erinnerung!',
                message: `<p> Sie müssen noch Ihre E-Mail: <em><b>` + this.user.email + `</b></em> bestätigen um Ihre Nutzerdaten ändern zu können.</p>`,
                buttons: [
                    {
                        text: 'Verstanden',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }
                ]
            });
            return await alert.present();
        }
    }

    async deleteWarning(user: User) {
        const alert = await this.alertController.create({
            mode: 'ios',
            header: 'Warnung!',
            subHeader: 'Diese Aktion kann nicht rückgängig gemacht werden.',
            message: `<p>Möchten Sie ihren Account <em><b>` + user.nutzername + `</b></em> wirklich löschen?</p>`,
            buttons: [
                {
                    text: 'SCHLIESSEN',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'LÖSCHEN',
                    handler: () => {
                        this.authService.deleteProfile(user);
                    }
                }
            ]
        });
        await alert.present();
    }
}
