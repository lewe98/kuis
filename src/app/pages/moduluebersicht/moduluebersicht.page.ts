import {Component} from '@angular/core';

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

    constructor() {
    }
}
