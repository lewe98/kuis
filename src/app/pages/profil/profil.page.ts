import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {ModalController} from '@ionic/angular';
import {ProfilEditPage} from './profil-edit/profil-edit.page';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.page.html',
    styleUrls: ['./profil.page.scss'],
})
export class ProfilPage {

    user = new User('', '', '');

    constructor(public authService: AuthService,
                private modalController: ModalController) {
        Object.assign(this.user, this.authService.user);
    }

    async showEditModal() {
        const modal = await this.modalController.create({
            component: ProfilEditPage
        });
        return await modal.present();
    }

}
