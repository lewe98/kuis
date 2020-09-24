import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Statistik} from '../../models/statistik';
import {StatistikService} from '../../services/statistik/statistik.service';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-statistik',
    templateUrl: './statistik.page.html',
    styleUrls: ['./statistik.page.scss'],
})
export class StatistikPage implements OnDestroy {

    tmpArray: Statistik[] = [];

    constructor(public authService: AuthService,
                public statistikService: StatistikService,
                private toastService: ToastService) {
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

    async clear() {
        await this.toastService.presentLoading('Bitte warten...')
            .then(() => {
                this.tmpArray = [];
            });
        await this.toastService.dismissLoading();
    }

    ngOnDestroy() {
        this.tmpArray = [];
        this.statistikService.tmpArray = [];
    }


}
