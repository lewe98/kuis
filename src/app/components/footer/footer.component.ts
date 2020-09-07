import {Component} from '@angular/core';
import {TermsPage} from '../../pages/legal/terms/terms.page';
import {PrivacyPage} from '../../pages/legal/privacy/privacy.page';
import {ModalController} from '@ionic/angular';
import {ImpressPage} from '../../pages/legal/impress/impress.page';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

    constructor(private modalController: ModalController) {
    }

    /**
     * Method to display impress
     */
    async showImpressModal() {
        const modal = await this.modalController.create({
            component: ImpressPage
        });
        return await modal.present();
    }

    /**
     * Method to display terms of use
     */
    async showTermsModal() {
        const modal = await this.modalController.create({
            component: TermsPage
        });
        return await modal.present();
    }

    /**
     * Method to display privacy policy
     */
    async showPrivacyModal() {
        const modal = await this.modalController.create({
            component: PrivacyPage
        });
        return await modal.present();
    }

}
