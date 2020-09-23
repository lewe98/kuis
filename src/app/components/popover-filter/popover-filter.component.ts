import { Component, OnInit } from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';

@Component({
  selector: 'app-popover-filter',
  templateUrl: './popover-filter.component.html',
  styleUrls: ['./popover-filter.component.scss'],
})
export class PopoverFilterComponent implements OnInit {

  constructor(public modulService: ModulService) { }


  ngOnInit() {}

}
