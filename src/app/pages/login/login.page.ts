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

    isOnline: boolean;
    passwordForLogIn: string;
    emailForLogIn: string;
    isSession: boolean;

    errors: Map<string, string> = new Map<string, string>();

    @ViewChild('email')
    private email: IonInput;



    constructor(private router: Router, private authService: AuthService ){
    }



    ngOnInit() {
        this.isOnline = false;
        // If an user is found in Storage
        this.isOnline = (sessionStorage.getItem('user') !== null) || (localStorage.getItem('user') !== null);
        // dont allows to nav to loginpage while log in;
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
    }

    ionViewDidEnter() {
            setTimeout(() => this.email.setFocus(), 10);
        }

    async login(email: string, password: string) {
        this.errors.clear();
        await this.authService.signIn(email, password).catch((error) => {
            if (error.code === 'auth/argument-error'){
                this.errors.set('wrongData', 'password or email should not be empty');
            } else if (error.code === 'auth/invalid-email'){
                this.errors.set('wrongData', ' the email adress is not correctly');
            } else if (error.code === 'auth/user-not-found'){
                this.errors.set('wrongData', 'email adress is not found in database. Create an Account!');
            } else if (error.code === 'auth/wrong-password') {
                this.errors.set('wrongData', 'wrong password');
            }
        });
        if (this.authService.isLoggedIn) {
            this.isOnline = true;
            this.router.navigate(['/startseite']);
        }
    }
    toggleSession(){
        this.authService.isSession = !this.authService.isSession;
        console.log(this.authService.isSession);
    }
}
