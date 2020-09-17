import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuluebersichtEditPage } from './moduluebersicht-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ModuluebersichtEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuluebersichtEditPageRoutingModule {}
