import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilEditPageRoutingModule } from './profil-edit-routing.module';

import { ProfilEditPage } from './profil-edit.page';
import {LandingPageModule} from '../../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilEditPageRoutingModule,
        LandingPageModule
    ],
  declarations: [ProfilEditPage]
})
export class ProfilEditPageModule {}
