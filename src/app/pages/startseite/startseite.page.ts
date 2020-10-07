import {Component} from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage {
    constructor(public modulService: ModulService, private authService: AuthService) {
        this.authService.loadPageSubscription(() => {
        });
    }
}
