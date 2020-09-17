import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {

    url = '';

    constructor(public storageService: StorageService,
                private router: Router) {
        this.storageService.findAllModules();
    }

    chooseQuiz(name: string, id: string, bild: string) {
        this.storageService.findAll(id, name, bild)
            .then(() => {
                this.storageService.getPicture(bild).then((res) => {
                    this.url = res;
                });
                this.router.navigate(['/quiz']);
                console.log(this.storageService.module[0]);
            });
    }
}
