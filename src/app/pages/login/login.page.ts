import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {IonInput} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    isSignedIn: boolean;
    passwordForLogIn: string;
    emailForLogIn: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('email')
    private email: IonInput;

    constructor(private router: Router, private authService: AuthService ){
    }

    ngOnInit() {
        this.isSignedIn = false;
        // If an user is found in Storage, it changes in true;
        this.isSignedIn = localStorage.getItem('user') !== null;
        // dont allows to nav to loginpage while log in;
        if (this.isSignedIn) {
            this.router.navigate(['/startseite']);
        }
    }

    ionViewDidEnter() {
            setTimeout(() => this.email.setFocus(), 10);
        }

    async login(email: string, password: string){
        this.errors.clear();
        await this.authService.signIn(email, password);
        if (this.authService.isLoggedIn){
            this.isSignedIn = true;
            this.router.navigate(['/startseite']);
        }else {
            this.errors.set('wrongData', 'Email oder Passwort falsch');
        }
    }
}
