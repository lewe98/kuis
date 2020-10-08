import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-popover-quelle',
    templateUrl: './popover-quelle.component.html',
    styleUrls: ['./popover-quelle.component.scss'],
})
export class PopoverQuelleComponent {
    @Input() quelle: string;
    public quelleBool = false;

    constructor(private modalCtrl: ModalController) {
    }

  /**
   * Method to dismiss the modal
   */
    close() {
        this.modalCtrl.dismiss();
    }

}
