import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StartseitePage} from './startseite.page';
import {LogoutComponent} from '../../components/logout/logout.component';

const routes: Routes = [
    {
        path: '',
        component: StartseitePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, LogoutComponent],
    declarations: [
        LogoutComponent
    ]
})
export class StartseitePageRoutingModule {
}
