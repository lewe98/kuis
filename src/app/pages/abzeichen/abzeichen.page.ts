import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Abzeichen} from '../../models/abzeichen';
import {AbzeichenService} from '../../services/abzeichen/abzeichen.service';
import {ToastService} from '../../services/toast/toast.service';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {IonInput, Platform, ViewDidEnter} from '@ionic/angular';
import {Plugins} from '@capacitor/core';
import {User} from '../../models/user';

@Component({
    selector: 'app-abzeichen',
    templateUrl: './abzeichen.page.html',
    styleUrls: ['./abzeichen.page.scss'],
})
export class AbzeichenPage implements ViewDidEnter, OnDestroy {

    abzeichenArray: Abzeichen[] = [];
    filteredAbzeichenArray: Abzeichen[] = [];
    subAbzeichen: Subscription;
    user: User;

    @ViewChild(IonInput) search: IonInput;

    constructor(private abzeichenService: AbzeichenService,
                public authService: AuthService,
                private toastService: ToastService,
                private platform: Platform) {
        this.toastService.presentLoading('Abzeichen werden geladen...')
            .then(async () => {
                await this.authService.loadPageSubscription(() => {
                    this.user = this.authService.getUser();
                    this.subAbzeichen = this.abzeichenService.findAllAbzeichen()
                        .subscribe(async data => {
                            this.abzeichenArray = data;
                            this.abzeichenService.sortAbzeichen(this.abzeichenArray);
                            this.filteredAbzeichenArray = this.abzeichenArray;
                            this.abzeichenService.checkPage();
                            await this.checkAbzeichenBestanden();
                        });
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

    /**
     * Method to set the achievements of a User to true, if that User has achieved one.
     */
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

    /**
     * Takes the search-query and uses it to filter through the whole array of achievements.
     *
     * @return an array filled with the title or description equal to the search-query.
     */
    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredAbzeichenArray = this.abzeichenArray.filter(a => {
            return a.titel.toLowerCase().includes(searchValue.toLowerCase()) ||
                a.beschreibung.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    /**
     * Clears the search-string and sets the filtered array of achievements equal to the whole array of achievments.
     */
    clear() {
        this.search.value = '';
        this.filteredAbzeichenArray = this.abzeichenArray;
    }

    /**
     * Activates the Share-Plugin with a template that displays all of the Users Achievements.
     * Iterates through all of the Achievements and compares them to the User to find the title.
     * Adds the title to a list.
     */
    async shareAbzeichen() {
        if (!this.platform.is('android')) {
            await this.toastService.presentWarningToast('Achtung.', 'Share API wird nur auf Android unterstützt.');
        } else if (!this.authService.getUser().abzeichen.length) {
            await this.toastService.presentWarningToast('Achtung.', 'Noch keine Abzeichen freigeschaltet...');
        } else {
            let list = '';
            const userAbzeichenArray = this.authService.getUser().abzeichen;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.abzeichenArray.length; i++) {
                userAbzeichenArray.forEach(userAbzeichen => {
                    if (userAbzeichen === this.abzeichenArray[i].id) {
                        list += this.abzeichenArray[i].titel + '\n';
                    }
                });
            }
            Plugins.Share.share({
                title: 'Meine Kuis Abzeichen!',
                text: 'Hey,\n' + 'das sind meine Abzeichen:\n' + list,
                dialogTitle: 'Leistungen teilen'
            }).catch(reason => {
                this.toastService.presentWarningToast('Error', reason);
            });
        }
    }

    /**
     * Sets the focus on the searchbar.
     */
    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 100);
    }

    /**
     * Dissolves the Subscription on the Achievements.
     */
    ngOnDestroy() {
        this.subAbzeichen.unsubscribe();
    }

}
