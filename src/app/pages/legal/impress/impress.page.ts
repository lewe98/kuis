import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-impress',
    templateUrl: './impress.page.html',
    styleUrls: ['./impress.page.scss'],
})
export class ImpressPage {

    constructor(private modalController: ModalController) {
    }

    dismiss() {
        this.modalController.dismiss();
    }

}
