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
        console.log(this.tmpArray);
    }

    /**
     * method to show all questions from the last lernrunde
     * @param stastik - an object with the question, the User Answer, and the correct Answer
     */
    async showStatistik(stastik: Statistik) {
        await this.tmpArray.forEach(e => {
            if (e === stastik) {
                e._showBeschreibung = !e._showBeschreibung;
            } else {
                e._showBeschreibung = false;
            }
        });
    }

    /**
     * Method to clear the array of the last "Lernrunden" game in order to see the total statistics
     */
    async clear() {
        await this.toastService.presentLoading('Bitte warten...')
            .then(() => {
                this.tmpArray = [];
            });
        await this.toastService.dismissLoading();
    }

    /**
     * resets all used variables and arrays
     */
    ngOnDestroy() {
        this.tmpArray = [];
        this.statistikService.tmpArray = [];
        this.statistikService.richtigBeantwortet = 0;
        this.statistikService.freiermodusanzahl = [];
        this.statistikService.freiermodusname = [];
        this.statistikService.lernmodushistorie = [];
    }


}
