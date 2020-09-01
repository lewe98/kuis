import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilEditPage } from './profil-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilEditPageRoutingModule {}
