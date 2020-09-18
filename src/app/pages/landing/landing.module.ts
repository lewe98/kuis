import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {StartseitePageRoutingModule} from '../startseite/startseite-routing.module';
import {FooterComponent} from '../../components/footer/footer.component';
import {ModuluebersichtPageModule} from '../moduluebersicht/moduluebersicht.module';
import {KuisButtonComponent} from '../../components/button/kuis-button/kuis-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LandingPageRoutingModule,
        StartseitePageRoutingModule,
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        KuisButtonComponent,
    ],
    declarations: [LandingPage, NavbarComponent, FooterComponent, KuisButtonComponent]
})
export class LandingPageModule {}
