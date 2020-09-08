import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StatistikPage} from './statistik.page';

const routes: Routes = [
    {
        path: '',
        component: StatistikPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatistikPageRoutingModule {
}
