import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfilPage} from './profil.page';

const routes: Routes = [
    {
        path: '',
        component: ProfilPage
    },
    {
        path: 'profil-edit',
        loadChildren: () => import('./profil-edit/profil-edit.module').then(m => m.ProfilEditPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilPageRoutingModule {
}
