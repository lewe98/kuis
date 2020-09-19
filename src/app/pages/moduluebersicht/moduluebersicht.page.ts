import {Component, ViewChild} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ModulService} from '../../services/modul/modul.service';
import {Modul} from '../../models/modul';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage implements ViewDidEnter {
    module: Modul[] = [];
    filteredModules: Modul[] = [];
    url = '';
    @ViewChild(IonInput) search: IonInput;

    constructor(private modulService: ModulService,
                public storageService: StorageService,
                private toastService: ToastService,
                private router: Router) {
        this.toastService.presentLoading('Fragenmodule werden geladen...')
            .then(async () => {
                await modulService.findAllModule()
                    .subscribe(async data => {
                        this.module = data;
                        // this.myModule = this.module.filter(a => {
                        //  return this.authService.getUser().importierteModule.includes(a.id);
                        // });
                        this.filteredModules = data;
                    });
                await this.toastService.dismissLoading();
            });
    }

    /**
     * Method to receive all questions from a quiz module.
     * @param name name of the chosen quiz.
     * @param id id of the chosen quiz.
     * @param bild name of the picture of the chosen quiz.
     */
    chooseQuiz(name: string, id: string, bild: string) {
        this.modulService.started = true;
        this.storageService.findAllFragen(id, name)
            .then(() => {
                this.storageService.getPicture(bild)
                    .then((res) => {
                        this.url = res;
                    });
                this.router.navigate(['/quiz']);
            });
    }

    /**
     * Method to fill an array with the filtered values.
     */
    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredModules = this.module.filter(a => {
            return a.titel.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    /**
     * Method to remove the search value.
     */
    clear() {
        this.search.value = '';
        this.filteredModules = this.module;
    }

    /**
     * Method to delete an imported module.
     */
    deleteModule() {
        console.log('Yet to be implemented!');
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }
}
