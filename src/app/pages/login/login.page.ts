import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {IonInput, ViewDidEnter} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
/**
 * Represents the LoginPage
 */
export class LoginPage implements OnInit, ViewDidEnter {

    isOnline: boolean;
    passwordForLogIn: string;
    emailForLogIn: string;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('email')
    private email: IonInput;

    /**
     * Constructor
     * @param router - is used to naviagte
     * @param authService - to use the Service with all authentification functions
     */
    constructor(private router: Router,
                private authService: AuthService) {
    }

    /**
     * checks if the input is correct and logged the user in if it is
     * @param email - user's email
     * @param password - user's password
     */
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

    /**
     * method to toggle the form of session
     */
    toggleSession() {
        this.authService.isSession = !this.authService.isSession;
    }

    /**
     * method to use the google login
     */
    googleLogin() {
        this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/startseite']);
        });
    }

    /**
     * checks on init if the user is logged in and blocks the navigate to the loginview if he is logged in
     */
    ngOnInit() {
        this.isOnline = false;
        // If an user is found in Storage
        this.isOnline = (sessionStorage.getItem('userID') !== null) || (localStorage.getItem('userID') !== null);
        // dont allows to nav to loginpage while log in;
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
    }

    /**
     * sets the focus on the email input
     */
    ionViewDidEnter() {
        setTimeout(() => this.email.setFocus(), 10);
    }
}
