import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AbzeichenService} from '../../services/abzeichen/abzeichen.service';

@Component({
    selector: 'app-hilfe',
    templateUrl: './hilfe.page.html',
    styleUrls: ['./hilfe.page.scss'],
})
export class HilfePage implements ViewDidEnter {

    @ViewChild(IonInput) search: IonInput;
    showText = false;
    filteredFragenArray = [];
    fragenArray = [
        {
            f: 'Wie starte ich ein Quiz?',
            a: 'Du musst...',
            show: false
        },
        {
            f: 'Wie erreiche ich ein Abzeichen?',
            a: 'Du musst...',
            show: false
        },
        {
            f: 'Wie lösche ich mein Profil?',
            a: 'Du musst...',
            show: false
        }];

    constructor(public authService: AuthService,
                private abzeichenService: AbzeichenService) {
        this.filteredFragenArray = this.fragenArray;
        authService.checkIfLoggedIn().then(res => {
            if (res) {
                this.abzeichenService.checkPage();
            }
        });
    }

    async showAntwort(frage: string) {
        await this.fragenArray.forEach(e => {
            if (e.f === frage) {
                e.show = !e.show;
            } else {
                e.show = false;
            }
        });
    }

    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredFragenArray = this.fragenArray.filter(f => {
            return f.f.toLowerCase().includes(searchValue.toLowerCase()) ||
                f.a.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    clear() {
        this.search.value = '';
        this.filteredFragenArray = this.fragenArray;
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }
}
