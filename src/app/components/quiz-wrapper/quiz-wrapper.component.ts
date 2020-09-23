import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';

@Component({
    selector: 'app-quiz-wrapper',
    templateUrl: './quiz-wrapper.component.html',
    styleUrls: ['./quiz-wrapper.component.scss'],
})
export class QuizWrapperComponent implements OnInit {

    @Input() titel: string;
    @Input() bild: string;
    @Input() add = false;
    @Input() edit = false;
    @Input() button = 'Starten';

    constructor(private storageService: StorageService) {
        /* alert(this.bild);
         this.storageService.getPicture(this.bild).then((res) => {
             alert(res);
             this.url = res;
         });

         */
    }

    ngOnInit() {
        if (this.add) {
            this.button = 'Hinzufügen';
        } else if (this.edit) {
            this.button = 'Löschen';
        }
    }

}
