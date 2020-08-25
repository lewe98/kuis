import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StartseitePageRoutingModule} from './startseite-routing.module';

import {StartseitePage} from './startseite.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StartseitePageRoutingModule
    ],
    declarations: [StartseitePage]
})
export class StartseitePageModule {
}
