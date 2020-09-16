import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ModuluebersichtPageRoutingModule} from './moduluebersicht-routing.module';

import {ModuluebersichtPage} from './moduluebersicht.page';
import {QuizWrapperComponent} from '../../components/quiz-wrapper/quiz-wrapper.component';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModuluebersichtPageRoutingModule,
        LandingPageModule
    ],
    declarations: [ModuluebersichtPage, QuizWrapperComponent]
})
export class ModuluebersichtPageModule {
}
