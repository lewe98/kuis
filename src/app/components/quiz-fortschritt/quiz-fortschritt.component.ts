import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-quiz-fortschritt',
    templateUrl: './quiz-fortschritt.component.html',
    styleUrls: ['./quiz-fortschritt.component.scss'],
})
export class QuizFortschrittComponent {
    @Input() anzahl: number;
    @Input() gesamtAnzahl: number;
    @Input() fortschritt: string;

    constructor() {
    }
}
