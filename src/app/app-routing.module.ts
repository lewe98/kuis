import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'startseite',
        loadChildren: () => import('./pages/startseite/startseite.module').then(m => m.StartseitePageModule)
    },
    {
        path: 'registrierung',
        loadChildren: () => import('./pages/registrierung/registrierung.module').then(m => m.RegistrierungPageModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'lernmodus',
        loadChildren: () => import('./pages/lernmodus/lernmodus.module').then(m => m.LernmodusPageModule)
    },
    {
        path: 'moduluebersicht',
        loadChildren: () => import('./pages/moduluebersicht/moduluebersicht.module').then(m => m.ModuluebersichtPageModule)
    },
    {
        path: 'statistik',
        loadChildren: () => import('./pages/statistik/statistik.module').then(m => m.StatistikPageModule)
    },
    {
        path: 'abzeichen',
        loadChildren: () => import('./pages/abzeichen/abzeichen.module').then(m => m.AbzeichenPageModule)
    },
    {
        path: 'profil',
        loadChildren: () => import('./pages/profil/profil.module').then(m => m.ProfilPageModule)
    },
    {
        path: 'hilfe',
        loadChildren: () => import('./pages/hilfe/hilfe.module').then(m => m.HilfePageModule)
    },
    {
        path: '**',
        redirectTo: 'startseite',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
