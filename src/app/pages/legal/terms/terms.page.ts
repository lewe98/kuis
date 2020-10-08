import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.page.html',
    styleUrls: ['./terms.page.scss'],
})
export class TermsPage {

    constructor(private modalController: ModalController) {
    }

    /**
     * Dismisses the Modal in the Terms Page.
     */
    dismiss() {
        this.modalController.dismiss();
    }

}
