import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-imprint',
    templateUrl: './imprint.page.html',
    styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage {

    constructor(private modalController: ModalController) {
    }

    /**
     * Dismisses the modal for the imprint page.
     */
    dismiss() {
        this.modalController.dismiss();
    }

}
