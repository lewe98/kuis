import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn = false;
    isSession = false;

    constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth) {

    }

    async signIn(email: string, password: string) {
        await this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
            this.isLoggedIn = true;
            console.log(this.isSession);
            if (!this.isSession) {
                 sessionStorage.setItem('user', JSON.stringify(res.user.uid));
            } else {
                localStorage.setItem('user', JSON.stringify(res.user.uid));
            }
        });
    }

    logOut() {
        this.afAuth.signOut().then(() => {
            this.isLoggedIn = false;
            this.router.navigate(['/login']);
        });
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
    }

    async signUp(email: string, password: string) {
        await this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user.uid));
        });
    }
}
