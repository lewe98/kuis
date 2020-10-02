import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-quiz-wrapper',
    templateUrl: './quiz-wrapper.component.html',
    styleUrls: ['./quiz-wrapper.component.scss'],
})
export class QuizWrapperComponent implements OnInit {

    @Input() length: number;
    @Input() titel: string;
    @Input() bild: string;
    @Input() add = false;
    @Input() edit = false;
    @Input() button = 'Starten';
    @Input() bestResult: number;

    constructor() {
    }

    ngOnInit() {
        if (this.add) {
            this.button = 'Hinzufügen';
        } else if (this.edit) {
            this.button = 'Löschen';
        }
    }

}
