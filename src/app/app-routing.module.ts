import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';

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
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'registrierung',
        loadChildren: () => import('./pages/registrierung/registrierung.module').then(m => m.RegistrierungPageModule)
    },
    {
        path: 'hilfe',
        loadChildren: () => import('./pages/hilfe/hilfe.module').then(m => m.HilfePageModule)
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
    },
    {
        path: 'startseite',
        loadChildren: () => import('./pages/startseite/startseite.module').then(m => m.StartseitePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'lernmodus',
        loadChildren: () => import('./pages/lernmodus/lernmodus.module').then(m => m.LernmodusPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'moduluebersicht',
        loadChildren: () => import('./pages/moduluebersicht/moduluebersicht.module').then(m => m.ModuluebersichtPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'quiz',
        loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.QuizPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'statistik',
        loadChildren: () => import('./pages/statistik/statistik.module').then(m => m.StatistikPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'abzeichen',
        loadChildren: () => import('./pages/abzeichen/abzeichen.module').then(m => m.AbzeichenPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profil',
        loadChildren: () => import('./pages/profil/profil.module').then(m => m.ProfilPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    },
  {
    path: 'moduluebersicht-edit',
    loadChildren: () => import('./pages/moduluebersicht-edit/moduluebersicht-edit/moduluebersicht-edit.module')
        .then(m => m.ModuluebersichtEditPageModule)
  },


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
