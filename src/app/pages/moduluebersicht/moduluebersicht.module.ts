import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ModuluebersichtPageRoutingModule} from './moduluebersicht-routing.module';

import {ModuluebersichtPage} from './moduluebersicht.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModuluebersichtPageRoutingModule
    ],
    declarations: [ModuluebersichtPage]
})
export class ModuluebersichtPageModule {
}
