import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {

    quizzes = [
        {
            titel: 'Fußball Quiz',
            bild: ''
        },
        {
            titel: 'Musik Quiz',
            bild: ''
        },
        {
            titel: 'Film Quiz',
            bild: ''
        }];

    constructor(public storageService: StorageService) {
    }
}
