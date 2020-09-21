import {Component, ViewChild, OnDestroy} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ModulService} from '../../services/modul/modul.service';
import {Modul} from '../../models/modul';
import {IonInput, IonRouterOutlet, ModalController, ViewDidEnter} from '@ionic/angular';
import {ToastService} from '../../services/toast/toast.service';
import {ModuluebersichtAddPage} from '../moduluebersicht-add/moduluebersicht-add/moduluebersicht-add.page';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage implements ViewDidEnter, OnDestroy {
    module: Modul[] = [];
    filteredModules: Modul[] = [];
    isEdit = false;
    subUser: Subscription;
    subModule: Subscription;
    url = '';
    @ViewChild(IonInput) search: IonInput;

    constructor(private authService: AuthService,
                private modulService: ModulService,
                public storageService: StorageService,
                private toastService: ToastService,
                private router: Router,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet) {
        this.authService.loadPageSubscription(() => {
            this.loadModule();
        });
        }

    loadModule() {
        this.toastService.presentLoading('Fragenmodule werden geladen...')
            .then(async () => {
                this.module = [];
                this.filteredModules = [];
                this.subModule = await this.modulService.findAllModule()
                    .subscribe(async data => {
                        await data.map(modul => {
                            this.authService.getUser().importierteModule.forEach(imported => {
                                if (modul.id === imported.id) {
                                    this.module.push(modul);
                                }
                            });
                        });
                        this.filteredModules = this.module;
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

    /**
     * Method opens Modal to import module.
     */
    async presentModalAddModule() {
        const modal = await this.modalController.create({
            component: ModuluebersichtAddPage,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl
        });
        return await modal.present();
    }

    edit() {
        this.isEdit = true;
    }

    undoEdit() {
        this.isEdit = false;
    }

    onButtonClick(module) {
        if (this.isEdit === false) {
            this.chooseQuiz(module.titel, module.id, module.bild);
        } else {
            const removeIndex = this.authService.getUser().importierteModule.map(item => item.id).indexOf(module.id);
            if (removeIndex >= 0) {
                this.authService.getUser().importierteModule.splice(removeIndex, 1);
            }
        }
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }
    ngOnDestroy() {
        this.subModule.unsubscribe();
    }
}
