import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    loggedIn = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate() {

        /*if (!this.authService.checkIfLoggedIn()) {
         this.router.navigate(['login']);
             return false;
         }*/
        return true;
    }
}
