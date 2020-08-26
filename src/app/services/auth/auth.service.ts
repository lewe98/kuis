import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User>;
    isLoggedIn = false;

    constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    }

    async signIn(email: string, password: string){
        await this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user));
        });
    }

    async signUp(email: string, password: string){
        await this.afAuth.createUserWithEmailAndPassword(email, password).then(res => {
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user));
        });
    }

    logOut() {
        this.afAuth.signOut().then(r => {
            this.router.navigate(['/login']);
        });
        localStorage.removeItem('user');
    }
}
