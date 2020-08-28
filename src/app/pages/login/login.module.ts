import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {LandingPageRoutingModule} from '../landing/landing-routing.module';
import {LandingPageModule} from '../landing/landing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        LandingPageRoutingModule,
        LandingPageModule
    ],
    declarations: [LoginPage]
})
export class LoginPageModule {
}
