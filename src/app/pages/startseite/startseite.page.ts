import {Component} from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {

    constructor(public modulService: ModulService) {
    }
}
