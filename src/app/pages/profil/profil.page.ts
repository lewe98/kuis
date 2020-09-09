import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {AlertController, ModalController} from '@ionic/angular';
import {ProfilEditPage} from './profil-edit/profil-edit.page';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Subscription} from 'rxjs';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss']
})
export class ProfilPage {

    user: User;
    subUser: Subscription;

    constructor(public authService: AuthService,
                private toastService: ToastService,
                private modalController: ModalController,
                private alertController: AlertController,
                private iab: InAppBrowser) {

        if (this.authService.user !== undefined) {
            this.user = this.authService.getUser();
        } else {
            this.toastService.presentLoading('Bitte warten...')
                .then(async () => {
                    await this.authService.findById(localStorage.getItem('userID'))
                        .subscribe(async u => {
                            this.user = u;
                        });
                    await this.toastService.dismissLoading();
                })
                .catch((error) => {
                    this.toastService.presentWarningToast('Error!', error);
                    this.toastService.dismissLoading();
                });
        }
    }

    openGoogleEdit() {
        this.iab.create('https://myaccount.google.com/');
    }

    async showEditModal() {
        const modal = await this.modalController.create({
            component: ProfilEditPage
        });
        return await modal.present();
    }

    async deleteWarning(user: User) {
        const alert = await this.alertController.create({
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
