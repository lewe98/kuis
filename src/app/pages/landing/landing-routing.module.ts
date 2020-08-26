import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes), IonicModule],
    exports: [RouterModule, NavbarComponent],
    declarations: [
        NavbarComponent
    ]
})
export class LandingPageRoutingModule {}
