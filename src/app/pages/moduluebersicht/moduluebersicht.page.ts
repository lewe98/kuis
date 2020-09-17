import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ModulService} from '../../services/modul/modul.service';
import {Modul} from '../../models/modul';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {
    module: Modul[];
    url = '';

    constructor(private modulService: ModulService,
                public storageService: StorageService,
                private router: Router) {
        modulService.findAllModule().subscribe(data => {
            console.log('Ich lade mich neu!');
            this.module = data;
        });
    }

    chooseQuiz(name: string, id: string, bild: string) {
        this.storageService.findAll(id, name)
            .then(() => {
                this.storageService.getPicture(bild).then((res) => {
                    this.url = res;
                });
                this.router.navigate(['/quiz']);
            });
    }
}
