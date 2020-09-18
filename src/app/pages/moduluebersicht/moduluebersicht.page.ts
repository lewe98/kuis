import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ModulService} from '../../services/modul/modul.service';
import {Modul} from '../../models/modul';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage {
    module: Modul[];
    myModule: Modul[];
    url = '';

    constructor(private modulService: ModulService,
                public storageService: StorageService,
                private router: Router,
                private authService: AuthService) {
        modulService.findAllModule().subscribe( data => {
            this.module = data;
            // this.myModule = this.module.filter(a => {
              //  return this.authService.getUser().importierteModule.includes(a.id);
            // });
            this.myModule = data;
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
