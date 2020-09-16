import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-quiz-wrapper',
    templateUrl: './quiz-wrapper.component.html',
    styleUrls: ['./quiz-wrapper.component.scss'],
})
export class QuizWrapperComponent implements OnInit {

    @Input() name: string;

    constructor() {
    }

    ngOnInit() {
    }

}
