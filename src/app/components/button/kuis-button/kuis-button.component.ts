import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kuis-button',
  templateUrl: './kuis-button.component.html',
  styleUrls: ['./kuis-button.component.scss'],
})
export class KuisButtonComponent implements OnInit {
  @Input() title: string;
  @Input() outline = false;
  @Input() margin = false;

  constructor() { }

  ngOnInit() {}

}
