import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {AlertController, ModalController} from '@ionic/angular';
import {ProfilEditPage} from './profil-edit/profil-edit.page';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {

    user = new User('profil', 'profil', 'profil');
    subUser: Subscription;

    constructor(public authService: AuthService,
                private modalController: ModalController,
                private alertController: AlertController) {
        // Object.assign(this.user, this.authService.user);
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


    ngOnInit() {
        if (localStorage.getItem('userID')) {
            this.subUser = this.authService.findById(localStorage.getItem('userID'))
                .subscribe(u => {
                    this.user = u;
                });
        } else if (sessionStorage.getItem('userID')) {
            this.subUser = this.authService.findById(sessionStorage.getItem('userID'))
                .subscribe(u => {
                    this.user = u;
                });
        }
    }

    ngOnDestroy() {
        this.subUser.unsubscribe();
    }
}
