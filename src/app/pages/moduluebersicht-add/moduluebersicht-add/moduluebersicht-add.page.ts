import { Component, OnInit } from '@angular/core';
import {ModulService} from '../../../services/modul/modul.service';
import {StorageService} from '../../../services/storage/storage.service';
import {ToastService} from '../../../services/toast/toast.service';
import {Modul} from '../../../models/modul';
import {AuthService} from '../../../services/auth/auth.service';
import {HilfsObjektFrage} from '../../../models/hilfsObjektFrage';

@Component({
  selector: 'app-moduluebersicht-add',
  templateUrl: './moduluebersicht-add.page.html',
  styleUrls: ['./moduluebersicht-add.page.scss'],
})
export class ModuluebersichtAddPage implements OnInit {

  module: Modul[] = [];
  filteredModules: Modul[] = [];
  lastImportedModuleID: string;
  lastImportedModuleTitel: string;
  array = [];

  constructor(public modulService: ModulService,
              private authService: AuthService,
              private toastService: ToastService,
              private storageService: StorageService) {
    this.toastService.presentLoading('Fragenmodule werden geladen...')
        .then(async () => {
          await modulService.findAllModule()
              .subscribe(async data => {
                  this.module = [];
                  this.filteredModules = [];
                  this.module = data;
                  const tmpModule = this.module;
                  for (let i = 0; i < this.module.length; i++) {
                      this.authService.getUser().importierteModule.forEach(imported => {
                          if (imported.id === tmpModule[i].id) {
                              tmpModule.splice(i, 1);
                          }
                      });
                  }
                  this.module = tmpModule;
                  this.filteredModules = tmpModule;
              });
          await this.toastService.dismissLoading();
        });
  }

  addQuestions() {
      this.storageService.findAllFragen(this.lastImportedModuleID, this.lastImportedModuleTitel).then(() => {
          this.array.push(this.storageService.fragen);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.array[0].length; i++){
              const object = new HilfsObjektFrage(this.array[0][i].id);
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
  }

  ngOnInit() {
  }

}
