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

    /**
     * Returns a value which is >=1. Takes the highest personal score and compares it to the length of the module itself.
     * Used to measure the progress that the player has made on that specific module.
     */
    progress() {
        return this.bestResult / this.length;
    }

    ngOnInit() {
        console.log(this.progress());
        if (this.add) {
            this.button = 'Hinzufügen';
        } else if (this.edit) {
            this.button = 'Löschen';
        }
    }

}
