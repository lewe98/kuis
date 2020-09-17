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
    filteredModules: Modul[] = [];
    url = '';

    constructor(private modulService: ModulService,
                public storageService: StorageService,
                private router: Router) {
        modulService.findAllModule().subscribe(data => {
            console.log('Ich lade mich neu!');
            this.module = data;
            this.filteredModules = this.module;
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

    /**
     * This function returns an filtered array of the modules based on a given query.
     *
     * @param $event is the given query.
     * @return either an filtered Array based on the given query, or if the query is empty, returns the full module list.
     */
   async search($event: any) {
        const query = $event.target.value;
        if (!query) {
            return this.module = this.filteredModules;
        }
        this.module = this.filteredModules.filter(m => {
            return (m.titel.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });
    }

    deleteModule() {
        console.log('Yet to be implemented!');
    }
}
