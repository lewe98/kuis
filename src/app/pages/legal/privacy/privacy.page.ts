import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.page.html',
    styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage {

    constructor(private modalController: ModalController) {
    }

    dismiss() {
        this.modalController.dismiss();
    }

}
