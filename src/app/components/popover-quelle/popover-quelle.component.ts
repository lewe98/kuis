import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-popover-quelle',
  templateUrl: './popover-quelle.component.html',
  styleUrls: ['./popover-quelle.component.scss'],
})
export class PopoverQuelleComponent implements OnInit {
  @Input() quelle: string;
  public quelleBool = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

}
