import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {IonInput, ViewDidEnter} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewDidEnter {

    isOnline: boolean;
    passwordForLogIn: string;
    emailForLogIn: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('email')
    private email: IonInput;

    constructor(private router: Router, private authService: AuthService) {
    }

    async login(email: string, password: string) {
        this.errors.clear();
        await this.authService.signIn(email, password).catch((error) => {
            if (error.code === 'auth/invalid-email') {
                this.errors.set('wrongData', 'Fehlerhaftes Email Format!');
            } else if (!email && !password) {
                this.errors.set('wrongData', 'E-Mail und Passwort darf nicht leer sein!');
            } else if (!email) {
                this.errors.set('wrongData', 'Email darf nicht leer sein!');
            } else if (!password) {
                this.errors.set('wrongData', 'Passwort darf nicht leer sein!');
            } else if (password.length < 6) {
                this.errors.set('wrongData', 'Passwort muss mindestens 6 Zeichen lang sein!');
            } else if (error.code === 'auth/user-not-found') {
                this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');
            } else if (error.code === 'auth/wrong-password') {
                this.errors.set('wrongData', 'E-Mail oder Passwort wurde falsch eingegeben!');
            }
        });
        if (this.authService.isLoggedIn) {
            this.isOnline = true;
            this.router.navigate(['/startseite']);
        }
    }

    toggleSession() {
        this.authService.isSession = !this.authService.isSession;
    }

    googleLogin() {
        this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/home']);
        });
    }

    ngOnInit() {
        this.isOnline = false;
        // If an user is found in Storage
        this.isOnline = (sessionStorage.getItem('userID') !== null) || (localStorage.getItem('userID') !== null);
        // dont allows to nav to loginpage while log in;
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
    }

    ionViewDidEnter() {
        setTimeout(() => this.email.setFocus(), 10);
    }
}
