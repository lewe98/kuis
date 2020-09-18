import {Component, OnDestroy} from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';
import {StorageService} from '../../services/storage/storage.service';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnDestroy {

    alleModule = [];
    alleFragen = [];
    lernmodusFragen = [];

    globalCounter = 0;

    constructor(private modulService: ModulService,
                private storageService: StorageService,
                private toastService: ToastService) {
        this.initialize();
    }

    ngOnDestroy() {
        this.modulService.isLernmodus = false;
    }

    async initialize() {
        await this.toastService.presentLoading('Spiel wird geladen...')
            .then(() => {
                if (this.modulService.isLernmodus) {
                    this.modulService.findAllModuleLernmodus()
                        .then(res => {
                            this.alleModule = res;
                            // TODO: - forEach/Counter umgehen
                            this.alleModule.forEach(elem => {
                                this.storageService.findAllFragenLernmodus(elem.id, elem.titel)
                                    .then(() => {
                                        this.alleFragen.push(this.storageService.fragen);
                                        this.globalCounter++;
                                        if (this.globalCounter === this.alleModule.length) {
                                            this.pushFrage();
                                        }
                                    });
                            });
                        });
                }
            });
        await this.toastService.dismissLoading();

    }

    pushFrage() {
        // console.log(zufallsZahlModule);
        // -> Zugriff auf Stelle des Fragenarrays, die math.random erzeugt hat
        // -> von diesem ermittelten modul länge ausgeben
        // console.log(anzahlFragen);
        // -> wieder math.random mit länge des moduls -1
        // console.log(zufallsZahlFragen);
        // -> prüfen, ob id bereits drin ist
        // -> pushen der ermittelten Frage bis 10 stk. drin sind

        if (this.modulService.isLernmodus) {
            this.lernmodusFragen = [];
            const alleFragenIndizes = this.alleFragen.length; // mit math.random zahl zwischen 0 und 3

            while (this.lernmodusFragen.length < 10) {
                let counter = 0;
                const zufallsZahlModule = Math.floor(Math.random() * alleFragenIndizes);
                const anzahlFragen = this.alleFragen[zufallsZahlModule].length;
                const zufallsZahlFragen = Math.floor(Math.random() * anzahlFragen);

                if (this.lernmodusFragen.length === 0) {
                    this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                } else {
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < this.lernmodusFragen.length; i++) {
                        if (this.lernmodusFragen[i].id !== this.alleFragen[zufallsZahlModule][zufallsZahlFragen].id) {
                            counter++;
                            if (counter === this.lernmodusFragen.length) {
                                this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                            }
                        }
                    }
                }
            }
            console.log(this.lernmodusFragen);
            this.storageService.fragen = [];
            this.storageService.fragen = this.lernmodusFragen;
        }
    }


}
