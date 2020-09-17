import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {

    constructor(public storageService: StorageService,
                private router: Router) {
        this.storageService.findAllModules();
    }

    chooseQuiz(name: string, id: string) {
        this.storageService.findAll(id, name)
            .then(() => this.router.navigate(['/quiz']));
    }
}
