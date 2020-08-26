import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/authGuard';
import {RegistrierungPage} from './pages/registrierung/registrierung.page';
import {LoginPage} from './pages/login/login.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
    },
    {
        path: 'registrierung',
        component: RegistrierungPage,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPage,
        pathMatch: 'full'
    },
    {
        path: 'startseite',
        loadChildren: () =>
            import('./pages/startseite/startseite.module').then((m) => m.StartseitePageModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
