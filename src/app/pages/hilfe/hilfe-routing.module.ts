import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HilfePage} from './hilfe.page';

const routes: Routes = [
    {
        path: '',
        component: HilfePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HilfePageRoutingModule {
}
