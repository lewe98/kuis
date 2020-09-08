import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpressPageRoutingModule } from './impress-routing.module';

import { ImpressPage } from './impress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpressPageRoutingModule
  ],
  declarations: [ImpressPage]
})
export class ImpressPageModule {}
