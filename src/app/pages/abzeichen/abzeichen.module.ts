import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AbzeichenPageRoutingModule} from './abzeichen-routing.module';

import {AbzeichenPage} from './abzeichen.page';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AbzeichenPageRoutingModule,
        LandingPageModule
    ],
    declarations: [AbzeichenPage]
})
export class AbzeichenPageModule {
}
