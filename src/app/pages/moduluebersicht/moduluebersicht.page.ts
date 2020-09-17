import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {

    fragen = [];

    constructor(public storageService: StorageService) {
        this.storageService.findAllModules();
    }

    async chooseQuiz(name: string, id: string) {
        this.storageService.findAll(id, name).then((res) => {
            this.fragen = res;
        });
    }
}
