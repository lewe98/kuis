import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-fortschritt',
  templateUrl: './quiz-fortschritt.component.html',
  styleUrls: ['./quiz-fortschritt.component.scss'],
})
export class QuizFortschrittComponent implements OnInit {
  @Input() anzahl = 5;
  @Input() gesamtAnzahl = 10;
  constructor() { }

  ngOnInit() {}

}
