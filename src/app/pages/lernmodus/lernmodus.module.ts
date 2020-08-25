import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LernmodusPageRoutingModule} from './lernmodus-routing.module';

import {LernmodusPage} from './lernmodus.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LernmodusPageRoutingModule
    ],
    declarations: [LernmodusPage]
})
export class LernmodusPageModule {
}
