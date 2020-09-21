import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Abzeichen} from '../../models/abzeichen';
import {AbzeichenService} from '../../services/abzeichen/abzeichen.service';
import {ToastService} from '../../services/toast/toast.service';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {IonInput, Platform, ViewDidEnter} from '@ionic/angular';
import {Plugins} from '@capacitor/core';

@Component({
    selector: 'app-abzeichen',
    templateUrl: './abzeichen.page.html',
    styleUrls: ['./abzeichen.page.scss'],
})
export class AbzeichenPage implements ViewDidEnter, OnDestroy {

    abzeichenArray: Abzeichen[] = [];
    filteredAbzeichenArray: Abzeichen[] = [];
    subAbzeichen: Subscription;
    subUser: Subscription;

    @ViewChild(IonInput) search: IonInput;

    constructor(private abzeichenService: AbzeichenService,
                public authService: AuthService,
                private toastService: ToastService,
                private platform: Platform) {
        this.toastService.presentLoading('Abzeichen werden geladen...')
            .then(async () => {
                if (this.authService.user === undefined) {
                    this.subUser = await this.authService.findById(localStorage.getItem('userID'))
                        .subscribe(async u => {
                            this.authService.user = await u;
                            this.authService.subUser = await this.subUser;
                            await this.subUser.unsubscribe();
                        });
                }
                this.subAbzeichen = await this.abzeichenService.findAllAbzeichen()
                    .subscribe(async data => {
                        // await this.authService.checkIfLoggedIn();
                        this.abzeichenArray = data;
                        this.sortAbzeichen();
                        this.filteredAbzeichenArray = this.abzeichenArray;
                        await this.checkAbzeichenBestanden();
                        await this.checkAbzeichen();
                    });
                await this.toastService.dismissLoading();
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

    async checkAbzeichenBestanden() {
        const userAbzeichenArray = this.authService.getUser().abzeichen;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.abzeichenArray.length; i++) {
            await userAbzeichenArray.forEach(userAbzeichen => {
                if (userAbzeichen === this.abzeichenArray[i].id) {
                    this.abzeichenArray[i].erreicht = true;
                }
            });
        }
    }

    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredAbzeichenArray = this.abzeichenArray.filter(a => {
            return a.titel.toLowerCase().includes(searchValue.toLowerCase()) ||
                a.beschreibung.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    clear() {
        this.search.value = '';
        this.filteredAbzeichenArray = this.abzeichenArray;
    }

    shareAbzeichen() {
        if (!this.platform.is('android')) {
            this.toastService.presentWarningToast('Achtung.', 'Share API wird nur auf Android unterstützt.');
        } else if (!this.authService.getUser().abzeichen.length) {
            this.toastService.presentWarningToast('Achtung.', 'Noch keine Abzeichen freigeschaltet...');
        } else {
            let list = '';
            this.authService
                .getUser().abzeichen
                .forEach(abzeichen => {
                    list += abzeichen + '%\n';
                });

            Plugins.Share.share({
                title: 'Meine Kuis Abzeichen!',
                text: 'Hey,\n' + 'das sind meine Abzeichen:\n' + list,
                dialogTitle: 'Leistungen teilen'
            }).catch(reason => {
                alert('Error: ' + reason);
            });
        }
    }

    sortAbzeichen() {
        this.abzeichenArray.sort(((a, b) => {
            return a.index - b.index;
        }));
    }

    checkAbzeichen() {

        // Eine Lernrunde abgeschlossen.
        if (this.authService.user.historieLernmodus.length === 1 &&
            !this.authService.user.abzeichen.find(a => a === this.abzeichenArray[3].id)) {
            this.authService.user.abzeichen.push(this.abzeichenArray[3].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + this.abzeichenArray[3].titel);
        }

        // 10 Lernrunden abgeschlossen.
        if (this.authService.user.historieLernmodus.length === 10 &&
            !this.authService.user.abzeichen.find(a => a === this.abzeichenArray[4].id)) {
            this.authService.user.abzeichen.push(this.abzeichenArray[4].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + this.abzeichenArray[4].titel);
        }

        // 50 Lernrunden abgeschlossen.
        if (this.authService.user.historieLernmodus.length === 50 &&
            !this.authService.user.abzeichen.find(a => a === this.abzeichenArray[5].id)) {
            this.authService.user.abzeichen.push(this.abzeichenArray[5].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + this.abzeichenArray[5].titel);
        }

        this.authService.updateProfile(this.authService.user);
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }

    ngOnDestroy() {
        this.subAbzeichen.unsubscribe();
    }

}
