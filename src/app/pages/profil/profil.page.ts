import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {AlertController, ModalController} from '@ionic/angular';
import {ProfilEditPage} from './profil-edit/profil-edit.page';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss'],
})
export class ProfilPage {

    user: User;

    constructor(public authService: AuthService,
                private modalController: ModalController,
                private alertController: AlertController) {
        this.user = this.authService.getUser();
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
