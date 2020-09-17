import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Frage} from '../../models/frage';

@Component({
    selector: 'app-frage',
    templateUrl: './frage.component.html',
    styleUrls: ['./frage.component.scss'],
})
export class FrageComponent {

    f = new Frage();
    bild = '';
    counter = 0;

    constructor(public storageService: StorageService) {
        this.initialize();
    }

    showNextQuestion() {
        this.counter++;
        this.initialize();
    }

    async initialize() {
        this.f.id = this.storageService.module[this.counter].id;
        this.f.frage = this.storageService.module[this.counter].frage;
        this.f.antworten = this.storageService.module[this.counter].antworten;
        this.shuffleAntworten(this.f.antworten);
        this.f.richtigeAntwort = this.storageService.module[this.counter].richtigeAntwort;
        this.f.bild = this.storageService.module[this.counter].bild;

        await this.storageService.getPicture(this.f.bild)
            .then((url) => {
                this.bild = url;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    shuffleAntworten(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    submitAnswer(gewaehlteAntwort: string) {
        if (this.f.richtigeAntwort === gewaehlteAntwort) {
            // TODO: - Style (grün, Konfetti)
            alert('richtig :)');
            setTimeout(() => {
                this.showNextQuestion();
            }, 2500);
        } else {
            // TODO: - Style (rot, Wackeln)
            alert('falsch :(');
            setTimeout(() => {
                this.showNextQuestion();
            }, 2500);
        }

    }

}
