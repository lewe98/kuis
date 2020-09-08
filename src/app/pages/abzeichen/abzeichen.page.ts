import {Component, OnInit} from '@angular/core';
import {Abzeichen} from '../../models/abzeichen';

@Component({
    selector: 'app-abzeichen',
    templateUrl: './abzeichen.page.html',
    styleUrls: ['./abzeichen.page.scss'],
})
export class AbzeichenPage implements OnInit {
    abzeichenArray: Abzeichen[] = [];

    constructor() {
        this.abzeichenArray.push(new Abzeichen( '1', 'Schnellster Lauf', 'Du erreichst diese Trophäe in dem du einen Record aufstellst.'));
        this.abzeichenArray.push(new Abzeichen( '2', 'Intelligenz Bolzen', 'Du erreichst diese Trophäe in dem du der Schlauste bist.'));
        this.abzeichenArray.push(new Abzeichen( '3', 'Schildkröte',
            'Du erreichst diese Trophäe in dem du mehr als 20 min für ein Quiz brauchst.'));
        this.abzeichenArray[2].erreicht = true;
    }
    async showAbzeichen(abzeichen: Abzeichen) {
        await this.abzeichenArray.forEach(e => {
            if (e === abzeichen) {
                e.showBeschreibung = !e.showBeschreibung;
            } else {
                e.showBeschreibung = false;
            }
        });
    }

    ngOnInit() {
    }

}
