import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuluebersichtAddPageRoutingModule } from './moduluebersicht-add-routing.module';

import { ModuluebersichtAddPage } from './moduluebersicht-add.page';
import {ModuluebersichtPageModule} from '../moduluebersicht/moduluebersicht.module';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModuluebersichtAddPageRoutingModule,
        ModuluebersichtPageModule,
        LandingPageModule
    ],
  declarations: [ModuluebersichtAddPage]
})
export class ModuluebersichtAddPageModule {}
