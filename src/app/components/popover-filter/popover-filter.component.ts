import {Component} from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';

@Component({
    selector: 'app-popover-filter',
    templateUrl: './popover-filter.component.html',
    styleUrls: ['./popover-filter.component.scss'],
})
export class PopoverFilterComponent {

    constructor(public modulService: ModulService) {
    }

}
