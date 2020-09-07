import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StartseitePageRoutingModule} from './startseite-routing.module';

import {StartseitePage} from './startseite.page';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StartseitePageRoutingModule,
        LandingPageModule
    ],
    declarations: [StartseitePage]
})
export class StartseitePageModule {
}
