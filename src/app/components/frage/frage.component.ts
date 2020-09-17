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
        await this.storageService.getPicture(this.storageService.module[this.counter].bild).then(() => {
            this.f.id = this.storageService.module[this.counter].id;
            this.f.frage = this.storageService.module[this.counter].frage;
            this.f.antworten = this.storageService.module[this.counter].antworten;
            this.f.richtigeAntwort = this.storageService.module[this.counter].richtigeAntwort;
            this.bild = this.storageService.url;
            alert(this.bild);
        });

    }

}
