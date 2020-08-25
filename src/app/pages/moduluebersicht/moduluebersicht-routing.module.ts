import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModuluebersichtPage} from './moduluebersicht.page';

const routes: Routes = [
    {
        path: '',
        component: ModuluebersichtPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuluebersichtPageRoutingModule {
}
