import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.checkIfLoggedIn().then(res => {
                if (!res) {
                    this.router.navigate(['/login']);
                }
                resolve(res);
            });
        });
        /*
        this.authService.loadPageSubscription((user) => {
            this.user = user;
        });
        if (this.authService.checkIfLoggedIn() && this.user !== undefined) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
         */
    }
}

