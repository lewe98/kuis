import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ModuluebersichtPageRoutingModule} from './moduluebersicht-routing.module';

import {ModuluebersichtPage} from './moduluebersicht.page';
import {QuizWrapperComponent} from '../../components/quiz-wrapper/quiz-wrapper.component';
import {LandingPageModule} from '../landing/landing.module';
import {KuisButtonComponent} from '../../components/button/kuis-button/kuis-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModuluebersichtPageRoutingModule,
        LandingPageModule
    ],
    exports: [
        KuisButtonComponent
    ],
    declarations: [ModuluebersichtPage, QuizWrapperComponent, KuisButtonComponent]
})
export class ModuluebersichtPageModule {
}
