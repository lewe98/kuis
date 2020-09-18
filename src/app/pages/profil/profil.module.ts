import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilPageRoutingModule} from './profil-routing.module';

import {ProfilPage} from './profil.page';
import {LandingPageModule} from '../landing/landing.module';
import {ModuluebersichtPageModule} from '../moduluebersicht/moduluebersicht.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilPageRoutingModule,
        LandingPageModule,
        ModuluebersichtPageModule
    ],
    declarations: [ProfilPage]
})
export class ProfilPageModule {
}
