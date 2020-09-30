import {Component, OnDestroy, ViewChild} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Router} from '@angular/router';
import {ModulService} from '../../services/modul/modul.service';
import {IonInput, IonRouterOutlet, ModalController, PopoverController, ViewDidEnter} from '@ionic/angular';
import {ToastService} from '../../services/toast/toast.service';
import {ModuluebersichtAddPage} from '../moduluebersicht-add/moduluebersicht-add.page';
import {AuthService} from '../../services/auth/auth.service';
import {Subscription} from 'rxjs';
import {PopoverFilterComponent} from '../../components/popover-filter/popover-filter.component';


@Component({
    selector: 'app-moduluebersicht',
    templateUrl: './moduluebersicht.page.html',
    styleUrls: ['./moduluebersicht.page.scss'],
})
export class ModuluebersichtPage implements ViewDidEnter, OnDestroy {
    isEdit = false;
    subUser: Subscription;
    url = '';
    @ViewChild(IonInput) search: IonInput;

    constructor(private authService: AuthService,
                public modulService: ModulService,
                public storageService: StorageService,
                private toastService: ToastService,
                private router: Router,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet,
                public popoverController: PopoverController) {
        this.authService.loadPageSubscription(() => {
            this.modulService.loadImportedModule();
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
                this.router.navigate(['/quiz']);
            });
    }

    /**
     * Method to fill an array with the filtered values.
     */
    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.modulService.filteredModules = this.modulService.importedModule.filter(a => {
            return a.titel.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    /**
     * Method to remove the search value.
     */
    clear() {
        this.search.value = '';
        this.modulService.setModuleEqual();
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

    /**
     * Handles the different events to the changing Button at the bottom of the modules.
     * If the user is not in Edit-Mode, clicking on the button will start the selected Quiz.
     * Otherwise it will be removed from the imported Modules.
     *
     * @param module is the quiz which is either started or deleted.
     */
    async onButtonClick(module) {
        if (this.isEdit === false) {
            this.chooseQuiz(module.titel, module.id, module.bild);
        } else {
            const user = await this.authService.getUser();
            const removeIndex = await user.importierteModule.map(item => item.id).indexOf(module.id);
            if (removeIndex >= 0) {
                await user.importierteModule.splice(removeIndex, 1);
                await this.authService.updateProfile(user);
            }
        }
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverFilterComponent,
            event: ev,
            translucent: true,
            backdropDismiss: true,
            mode: 'ios',
        });
        return await popover.present();
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }

    ngOnDestroy() {
        this.modulService.subModule.unsubscribe();
    }
}
