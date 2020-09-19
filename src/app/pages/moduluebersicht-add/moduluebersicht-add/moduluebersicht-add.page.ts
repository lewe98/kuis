import { Component, OnInit } from '@angular/core';
import {ModulService} from '../../../services/modul/modul.service';
import {StorageService} from '../../../services/storage/storage.service';
import {ToastService} from '../../../services/toast/toast.service';
import {Modul} from '../../../models/modul';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-moduluebersicht-add',
  templateUrl: './moduluebersicht-add.page.html',
  styleUrls: ['./moduluebersicht-add.page.scss'],
})
export class ModuluebersichtAddPage implements OnInit {

  module: Modul[] = [];
  filteredModules: Modul[] = [];
  constructor(public modulService: ModulService,
              private authService: AuthService,
              private toastService: ToastService) {
    this.toastService.presentLoading('Fragenmodule werden geladen...')
        .then(async () => {
          await modulService.findAllModule()
              .subscribe(async data => {
                  this.module = data;
                  await this.authService.getUser().importierteModule.forEach(imported => {
                      if (this.module.includes(imported)) {
                          this.module.splice(this.module.indexOf(imported), 1);
                      }
                  });
                  this.filteredModules = this.module;
              });
          await this.toastService.dismissLoading();
        });
  }
  addModule(module: Modul) {
      this.modulService.importModule(module);
      this.module.splice(this.module.indexOf(module), 1);
      this.filteredModules = this.module;
  }

  ngOnInit() {
  }

}
