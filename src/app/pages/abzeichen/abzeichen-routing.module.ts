import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AbzeichenPage} from './abzeichen.page';

const routes: Routes = [
    {
        path: '',
        component: AbzeichenPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AbzeichenPageRoutingModule {
}
