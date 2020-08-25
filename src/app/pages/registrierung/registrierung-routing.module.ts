import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrierungPage} from './registrierung.page';

const routes: Routes = [
    {
        path: '',
        component: RegistrierungPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegistrierungPageRoutingModule {
}
