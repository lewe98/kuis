import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.page.html',
    styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements OnInit {

    // isSignedIn = false;
    emailForSignUp: string;
    passwordForSignUp: string;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        // if (localStorage.getItem('user') !== null) {
        //     this.isSignedIn = true;
        // } else {
        //     this.isSignedIn = false;
        // }
    }

    async signUp(email: string, password: string){
    //     await this.authService.signUp(email, password);
    //     if (this.authService.isLoggedIn){
    //         this.isSignedIn = true;
    //     }
     }
}
