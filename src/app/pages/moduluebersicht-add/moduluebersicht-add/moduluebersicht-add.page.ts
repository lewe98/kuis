import {Component, ViewChild} from '@angular/core';
import {ModulService} from '../../../services/modul/modul.service';
import {StorageService} from '../../../services/storage/storage.service';
import {ToastService} from '../../../services/toast/toast.service';
import {Modul} from '../../../models/modul';
import {AuthService} from '../../../services/auth/auth.service';
import {HilfsObjektFrage} from '../../../models/hilfsObjektFrage';
import {IonInput, ModalController} from '@ionic/angular';
import {AbzeichenService} from '../../../services/abzeichen/abzeichen.service';


@Component({
    selector: 'app-moduluebersicht-add',
    templateUrl: './moduluebersicht-add.page.html',
    styleUrls: ['./moduluebersicht-add.page.scss'],
})
export class ModuluebersichtAddPage {

    module: Modul[] = [];
    filteredModules: Modul[] = [];
    lastImportedModuleID: string;
    lastImportedModuleTitel: string;
    array = [];
    @ViewChild(IonInput) search: IonInput;

    constructor(public modulService: ModulService,
                private authService: AuthService,
                private toastService: ToastService,
                private storageService: StorageService,
                public abzeichenService: AbzeichenService,
                public modalController: ModalController) {
        this.toastService.presentLoading('Fragenmodule werden geladen...')
            .then(async () => {
                await modulService.findAllModule()
                    .subscribe(async data => {
                        this.module = [];
                        this.filteredModules = [];
                        this.module = data;
                        this.module.forEach(e => this.filteredModules.push(e));
                        this.module.forEach(modul => {
                            this.authService.getUser().importierteModule.forEach(imported => {
                                if (imported.id === modul.id && this.filteredModules.includes(modul)) {
                                    this.filteredModules.splice(this.filteredModules.indexOf(modul), 1);
                                }
                            });
                        });
                        this.module = this.filteredModules;
                    });
                await this.toastService.dismissLoading();
            });
    }

    addQuestions() {
        this.array = [];
        this.storageService.findAllFragen(this.lastImportedModuleID, this.lastImportedModuleTitel).then(() => {
            this.array.push(this.storageService.fragen);
            console.log(this.array);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.array[0].length; i++) {
                const object = new HilfsObjektFrage(this.array[0][i].id, this.lastImportedModuleID);
                this.modulService.addQuestion(object);
            }
        });
    }

    addModule(module: Modul) {
        this.lastImportedModuleID = module.id;
        this.lastImportedModuleTitel = module.titel;
        this.modulService.importModule(module);
        this.module.splice(this.module.indexOf(module), 1);
        this.filteredModules = this.module;
        this.addQuestions();
        this.abzeichenService.checkAbzeichenModulImportiert();
    }

    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredModules = this.module.filter(m => {
            return m.titel.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    clear() {
        this.search.value = '';
        this.filteredModules = this.module;
    }

}
