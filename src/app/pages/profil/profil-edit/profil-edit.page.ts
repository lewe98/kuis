import {Component, ViewChild} from '@angular/core';
import {IonInput, ModalController, ViewDidEnter} from '@ionic/angular';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {AbzeichenService} from '../../../services/abzeichen/abzeichen.service';

@Component({
    selector: 'app-profil-edit',
    templateUrl: './profil-edit.page.html',
    styleUrls: ['./profil-edit.page.scss'],
})
export class ProfilEditPage implements ViewDidEnter {

    user: User;
    alterNutzername: string;
    errors: Map<string, string> = new Map<string, string>();
    @ViewChild('focus') private nutzernameRef: IonInput;

    constructor(private authService: AuthService,
                private abzeichenService: AbzeichenService,
                private modalController: ModalController) {
        this.user = this.authService.getUser();
        this.alterNutzername = this.user.nutzername;
    }

    /**
     * Method to save the new data of a user
     * @param nutzername new username of the user
     */
    save(nutzername: string) {
        this.errors.clear();
        if (nutzername.trim() === '') {
            this.errors.set('nutzername', 'Nutzername darf nicht leer sein!');
        }
        if (this.errors.size === 0) {
            this.abzeichenService.checkUsernameChanged(this.alterNutzername);
            if (nutzername.trim() === '') {
                this.user.nutzername = this.alterNutzername;
            }
            this.authService.update(this.user)
                .then(() => {
                    this.dismiss();
                });
        }
    }

    /**
     * Method to dismiss the modal
     */
    dismiss() {
        if (this.user.nutzername.trim() === '') {
            this.user.nutzername = this.alterNutzername;
        }
        this.modalController.dismiss();
    }

    ionViewDidEnter() {
        this.nutzernameRef.setFocus();
    }

}
