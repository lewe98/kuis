import {Component, OnDestroy, OnInit} from '@angular/core';
import {Abzeichen} from '../../models/abzeichen';
import {AbzeichenService} from '../../services/abzeichen/abzeichen.service';
import {ToastService} from '../../services/toast/toast.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-abzeichen',
    templateUrl: './abzeichen.page.html',
    styleUrls: ['./abzeichen.page.scss'],
})
export class AbzeichenPage implements OnInit, OnDestroy {
    abzeichenArray: Abzeichen[] = [];

    constructor(private abzeichenService: AbzeichenService,
                private authService: AuthService,
                private toastService: ToastService) {
        this.toastService.presentLoading('Abzeichen werden geladen...').then(() => {
            this.abzeichenService.findAllAbzeichen().subscribe(async data => {
                // await this.authService.checkIfLoggedIn();
                this.abzeichenArray = data;
                await this.checkAbzeichenBestanden();
                await this.toastService.dismissLoading();
            });
        });

        /*
        this.abzeichenArray.push(new Abzeichen( '1', 'Schnellster Lauf', 'Du erreichst diese Trophäe in dem du einen Record aufstellst.'));
        this.abzeichenArray.push(new Abzeichen( '2', 'Intelligenz Bolzen', 'Du erreichst diese Trophäe in dem du der Schlauste bist.'));
        this.abzeichenArray.push(new Abzeichen( '3', 'Schildkröte',
            'Du erreichst diese Trophäe in dem du mehr als 20 min für ein Quiz brauchst.'));
        this.abzeichenArray[2].erreicht = true;
         */
    }

    /**
     * Method to show the description of an 'Abzeichen'.
     * @param abzeichen is the 'Abzeichen' where the description will shown.
     */
    async showAbzeichen(abzeichen: Abzeichen) {
        await this.abzeichenArray.forEach(e => {
            if (e === abzeichen) {
                e.showBeschreibung = !e.showBeschreibung;
            } else {
                e.showBeschreibung = false;
            }
        });
    }

    checkAbzeichenBestanden() {
        const userAbzeichenArray = this.authService.getUser().abzeichen;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.abzeichenArray.length; i++) {
            userAbzeichenArray.forEach(userAbzeichen => {
                if (userAbzeichen === this.abzeichenArray[i].id) {
                    this.abzeichenArray[i].erreicht = true;
                }
            });
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
