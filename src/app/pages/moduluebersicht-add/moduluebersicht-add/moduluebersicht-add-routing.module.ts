import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuluebersichtAddPage } from './moduluebersicht-add.page';

const routes: Routes = [
  {
    path: '',
    component: ModuluebersichtAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuluebersichtAddPageRoutingModule {}
