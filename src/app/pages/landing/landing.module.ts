import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {StartseitePageRoutingModule} from '../startseite/startseite-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    StartseitePageRoutingModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [LandingPage, NavbarComponent]
})
export class LandingPageModule {}
