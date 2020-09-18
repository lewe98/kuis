import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuluebersichtEditPageRoutingModule } from './moduluebersicht-edit-routing.module';

import { ModuluebersichtEditPage } from './moduluebersicht-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuluebersichtEditPageRoutingModule
  ],
  declarations: [ModuluebersichtEditPage]
})
export class ModuluebersichtEditPageModule {}
