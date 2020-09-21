import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPageRoutingModule } from './quiz-routing.module';

import { QuizPage } from './quiz.page';
import {FrageComponent} from '../../components/frage/frage.component';
import {LandingPageModule} from '../landing/landing.module';
import {QuizFortschrittComponent} from '../../components/quiz-fortschritt/quiz-fortschritt.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuizPageRoutingModule,
        LandingPageModule
    ],
    declarations: [QuizPage, FrageComponent, QuizFortschrittComponent]
})
export class QuizPageModule {}
