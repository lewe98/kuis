import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-quiz-fortschritt',
    templateUrl: './quiz-fortschritt.component.html',
    styleUrls: ['./quiz-fortschritt.component.scss'],
})
export class QuizFortschrittComponent {
    @Input() anzahl: number;
    @Input() gesamtAnzahl: number;
    @Input() fortschritt = '10%';

    // fortschritt: string = (Number(this.anzahl) / Number(this.gesamtAnzahl)).toString() + '%';

    constructor() {
    }

    alert() {
        alert(this.fortschritt);
    }
}
