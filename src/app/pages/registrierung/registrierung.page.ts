import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registrierung',
    templateUrl: './registrierung.page.html',
    styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements OnInit {

    emailForSignUp: string;
    passwordForSignUp: string;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    signUp(email: string, password: string){
     this.authService.signUp(email, password).then(() =>
         this.router.navigate(['/startseite'])
     );

     }
}
