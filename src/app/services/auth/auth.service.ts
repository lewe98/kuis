import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Observable, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    subs: Subscription[] = [];
    user: User;
    isLoggedIn = false;
    isSession = false;
    userCollection: AngularFirestoreCollection<User>;

    constructor(private router: Router,
                private afs: AngularFirestore,
                private afAuth: AngularFireAuth) {
        this.userCollection = afs.collection<User>('users');
    }

    // COPY AND PREPARE
    private static copyAndPrepare(user: User): User {
        const copy = {...user};
        delete copy.id;

        copy.nutzername = copy.nutzername || null;
        copy.email = copy.email || null;
        copy.passwort = copy.passwort || null;

        copy.emailBestaetigt = copy.emailBestaetigt || false;
        copy.isOnboarded = copy.isOnboarded || false;

        // TODO: - Statistik in Firebase
        copy.statistik = copy.statistik || null;

        copy.abzeichen = copy.abzeichen || null;
        copy.importierteModule = copy.importierteModule || null;

        return copy;
    }

    // CRUD
    /**
     * Method to persist the user's data in the database
     */
    persist(user: User, id: string) {
        this.userCollection.doc(id).set(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to find a user by id
     * @param id id of a user
     * @return Observable<User> user that was found
     */
    findById(id): Observable<User> {
        const changeAction = this.userCollection.doc<User>(id);
        return changeAction.snapshotChanges()
            .pipe(
                map(changes => {
                    const data = changes.payload.data();
                    if (data) {
                        data.id = id;
                    }
                    return {...data};
                }));
    }

    /**
     * Method to update the user's data in the database
     * @param user user to be updated
     */
    update(user: User) {
        this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to delete a user in the database
     * @param user user to be deleted
     */
    delete(user: User) {
        this.userCollection.doc(user.id).delete();
        this.logOut();
    }

    // LOGIN
    /**
     * Method to sign in a user
     * @param email user's email
     * @param password user's password
     */
    async signIn(email: string, password: string) {
        // await this.afAuth.signInWithEmailAndPassword(email, bcrypt.hashSync(password, bcrypt.genSaltSync(10))).then(res => {
        await this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
            this.isLoggedIn = true;
            if (!this.isSession) {
                sessionStorage.setItem('userID', JSON.stringify(res.user.uid));
            } else {
                localStorage.setItem('userID', JSON.stringify(res.user.uid));
            }

            this.subs.push(this.findById(res.user.uid).subscribe(u => {
                this.user = u;
            }));
        });
    }

    /**
     * Method to check whether a user is logged in or not
     * @return boolean true, if logged in (ID stored in local storage / session storage)
     */
    checkIfLoggedIn(): boolean {
        return !!localStorage.getItem('userID') || !!sessionStorage.getItem('userID');
    }

    /**
     * Method to sign out a user
     */
    logOut() {
        this.afAuth.signOut().then(() => {
            this.isLoggedIn = false;

            this.subs.forEach((sub) => {
                if (sub) {
                    sub.unsubscribe();
                }
            });

            this.router.navigate(['/login']);
        });

        sessionStorage.removeItem('userID');
        localStorage.removeItem('userID');
    }

    // REGISTER
    /**
     * Method to sign up a user
     * @param nutzername user's username
     * @param email user's email
     * @param passwort user's password
     */
    async signUp(nutzername: string, email: string, passwort: string) {
        // await this.afAuth.createUserWithEmailAndPassword(email, bcrypt.hashSync(passwort, bcrypt.genSaltSync(10))).then(res => {
        await this.afAuth.createUserWithEmailAndPassword(email, passwort).then(res => {
            this.isLoggedIn = true;

            this.persist(new User(nutzername, email, passwort), res.user.uid);

            this.subs.push(this.findById(res.user.uid).subscribe(u => {
                this.user = u;
            }));
            localStorage.setItem('userID', JSON.stringify(res.user.uid));
        });
    }

    // GOOGLE LOGIN

    /**
     * Method to provide a google authentication provider
     */
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    /**
     * Method to authenticate with google login credentials
     * @param provider google authentication provider
     * @return Promise resolves, if user could be logged in
     */
    AuthLogin(provider): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.signInWithPopup(provider)
                .then((result) => {
                    this.findById(result.user.uid)
                        .pipe(take(1))
                        .subscribe((res) => {
                            if (res.id !== undefined) {
                                this.subs.push(this.findById(res.id)
                                    .subscribe((u) => {
                                        this.user = u;
                                        sessionStorage.setItem('userID', JSON.stringify(u.id));
                                        this.router.navigate(['/startseite']);
                                        resolve();
                                    }));
                            } else {
                                this.user = new User(result.user.displayName, result.user.email, '');
                                this.persist(AuthService.copyAndPrepare(this.user), result.user.uid);
                                this.subs.push(this.findById(result.user.uid)
                                    .subscribe((u) => {
                                        this.user = u;
                                        sessionStorage.setItem('userID', JSON.stringify(u.id));
                                        this.router.navigate(['/startseite']);
                                        resolve();
                                    }));
                            }
                        });
                }).catch((error) => {
                reject(error);
            });
        });
    }
}
