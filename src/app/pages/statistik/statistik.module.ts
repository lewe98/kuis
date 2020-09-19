import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StatistikPageRoutingModule} from './statistik-routing.module';

import {StatistikPage} from './statistik.page';
import {LandingPageModule} from '../landing/landing.module';
import {PieChartComponent} from '../../components/pie-chart/pie-chart.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StatistikPageRoutingModule,
        LandingPageModule,
        ChartsModule
    ],
    declarations: [StatistikPage, PieChartComponent]
})
export class StatistikPageModule {
}
