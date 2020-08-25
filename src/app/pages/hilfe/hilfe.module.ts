import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HilfePageRoutingModule} from './hilfe-routing.module';

import {HilfePage} from './hilfe.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HilfePageRoutingModule
    ],
    declarations: [HilfePage]
})
export class HilfePageModule {
}
