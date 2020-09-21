import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Statistik} from '../../models/statistik';
import {StatistikService} from '../../services/statistik/statistik.service';

@Component({
    selector: 'app-statistik',
    templateUrl: './statistik.page.html',
    styleUrls: ['./statistik.page.scss'],
})
export class StatistikPage implements OnDestroy {


    tmpArray: Statistik[] = [];

    constructor(public authService: AuthService, public statistikService: StatistikService) {
            this.tmpArray = this.statistikService.tmpArray;
    }

    async showAbzeichen(stastik: Statistik) {
        await this.tmpArray.forEach(e => {
            if (e === stastik) {
                e.showBeschreibung = !e.showBeschreibung;
            } else {
                e.showBeschreibung = false;
            }
        });
    }

    ngOnDestroy(){
        this.tmpArray = [];
        this.statistikService.tmpArray = [];
    }


}
