import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Observable, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import * as firebase from 'firebase';
import {auth} from 'firebase';
import {ToastService} from '../toast/toast.service';

// import * as crypto from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: User;
    subUser: Subscription;
    userCollection: AngularFirestoreCollection<User>;

    isLoggedIn = false;
    isSession = false;

    constructor(private router: Router,
                private afs: AngularFirestore,
                private afAuth: AngularFireAuth,
                private toastService: ToastService) {
        this.userCollection = afs.collection<User>('users');
    }

    /**
     * Copy an Prepair
     * @param user - the current logged in user
     */
    private static copyAndPrepare(user: User): User {
        const copy = {...user};
        delete copy.id;

        copy.nutzername = copy.nutzername || null;
        copy.email = copy.email || null;
        copy.passwort = copy.passwort || null;
        copy.googleAccount = copy.googleAccount || null;

        copy.emailBestaetigt = copy.emailBestaetigt || false;
        copy.isOnboarded = copy.isOnboarded || false;
        copy.gesamtzeit = copy.gesamtzeit || null;
        copy.historieLernmodus = copy.historieLernmodus || null;
        copy.abzeichen = copy.abzeichen || null;
        copy.importierteModule = copy.importierteModule || null;
        copy.availableQuestions = copy.availableQuestions || null;

        return copy;
    }

    /**
     * Method to persist the user's data in the database
     */
    persist(user: User, id: string) {
        this.toastService.presentToast('Erfolgreich registriert!');
        this.userCollection.doc(id).set(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to return the authenticated user
     * @return user current user
     */
    getUser(): User {
        return this.user;
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
    async updateProfile(user: User) {
        if (window.location.pathname === '/quiz') {
            await this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
        } else {
            await this.toastService.presentLoading('Bitte warten. \n Dieser Vorgang kann einige Sekunden dauern...')
                .then(async () => {
                    if (window.location.pathname === '/profil') {
                        await firebase.auth().currentUser.updateEmail(user.email)
                            .catch((error) => {
                                this.toastService.presentWarningToast('Error!', error);
                                this.toastService.dismissLoading();
                            });
                        if (user.passwort) {
                            await firebase.auth().currentUser.updatePassword(user.passwort)
                                .catch((error) => {
                                    this.toastService.presentWarningToast('Error!', error);
                                    this.toastService.dismissLoading();
                                });
                        }
                        await firebase.auth().currentUser.updateProfile({displayName: user.nutzername})
                            .catch((error) => {
                                this.toastService.presentWarningToast('Error!', error);
                                this.toastService.dismissLoading();
                            });
                    }
                    await this.toastService.dismissLoading();
                    await this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
                });
        }
        if (window.location.pathname === '/profil') {
            await this.toastService.presentToast('Profil erfolgreich aktualisiert.');
        }
    }

    /**
     * Method to delete a user in the database
     * @param user user to be deleted
     */
    async deleteProfile(user: User) {
        await this.userCollection.doc(user.id).delete();
        await firebase.auth().currentUser.delete();

        await this.toastService.presentLoading('Bitte warten. \n Dies kann einige Sekunden dauern.');
        await this.logOut();
        await this.toastService.dismissLoading();
        await this.toastService.presentWarningToast('Account gelöscht.', 'Du wurdest ausgeloggt.');
    }

    /**
     * Method to sign in a user
     * @param email user's email
     * @param password user's password
     */
    async signIn(email: string, password: string) {

        await this.toastService.presentLoading('Bitte warten...');
        // const pw = crypto.AES.encrypt(password, '').toString();

        await this.afAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.isLoggedIn = true;
                if (!this.isSession) {
                    sessionStorage.setItem('userID', res.user.uid);
                } else {
                    localStorage.setItem('userID', res.user.uid);
                }
                this.subUser = this.findById(res.user.uid)
                    .subscribe(u => {
                        this.user = u;
                    });
                this.toastService.dismissLoading();
            })
            .catch((error) => {
                this.toastService.presentWarningToast('Error!', error);
                this.toastService.dismissLoading();
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
            sessionStorage.clear();
            localStorage.clear();
            this.subUser.unsubscribe();
            this.router.navigate(['/landing']);
        });
    }

    // REGISTER
    /**
     * Method to sign up a user
     * @param nutzername user's username
     * @param email user's email
     * @param passwort user's password
     */
    async signUp(nutzername: string, email: string, passwort: string) {

        await this.toastService.presentLoading('Bitte warten...');

        // const pw = crypto.AES.encrypt(passwort, '').toString();

        await this.afAuth.createUserWithEmailAndPassword(email, passwort)
            .then(res => {
                this.isLoggedIn = true;
                this.persist(new User(nutzername, email, passwort, false), res.user.uid);

                this.subUser = this.findById(res.user.uid)
                    .subscribe(u => {
                        this.user = u;
                    });
                localStorage.setItem('userID', res.user.uid);
                this.router.navigate(['/startseite']);
                this.toastService.dismissLoading();
            })
            .catch((error) => {
                this.toastService.presentWarningToast('Error!', error);
                this.toastService.dismissLoading();
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
    async AuthLogin(provider): Promise<any> {
        return new Promise(async (resolve, reject) => {

            await this.toastService.presentLoading('Bitte warten...');

            await this.afAuth.signInWithPopup(provider)
                .then((result) => {
                    this.findById(result.user.uid)
                        .pipe(take(1))
                        .subscribe((res) => {
                            if (res.id !== undefined) {

                                this.isLoggedIn = true;
                                localStorage.setItem('userID', result.user.uid);

                                this.subUser = this.findById(res.id)
                                    .subscribe((u) => {
                                        this.user = u;
                                        resolve();
                                    });
                            } else {

                                this.user = new User(result.user.displayName, result.user.email, '', true);
                                this.persist(AuthService.copyAndPrepare(this.user), result.user.uid);
                                this.isLoggedIn = true;
                                localStorage.setItem('userID', result.user.uid);

                                this.subUser = this.findById(result.user.uid)
                                    .subscribe((u) => {
                                        this.user = u;
                                        resolve();
                                    });
                            }
                        });
                }).catch((error) => {
                    reject(error);
                });
            await this.toastService.dismissLoading();
        });
    }

    /***
     * This Method gets the User from From Firebase and saves it in the Service.
     */
    async loadPage() {
        await this.toastService.presentLoading('Bitte warten...')
            .then( async () => {
                this.subUser = await this.findById(localStorage.getItem('userID'))
                    .subscribe(async u => {
                        this.user = await u;
                        // this.authService.subUser = await this.subUser;
                        await this.toastService.dismissLoading();
                    });
            })
            .catch((error) => {
                this.toastService.presentWarningToast('Error!', error);
                this.toastService.dismissLoading();
            });
    }

    /***
     * This Method subscribes the User from From Firebase and saves it in the Service.
     * @param callback() is everytime called if the User in Firebase is changed.
     */
    async loadPageSubscription(callback: () => void) {
        await this.toastService.presentLoading('Bitte warten...')
            .then( async () => {
                this.subUser = await this.findById(localStorage.getItem('userID'))
                    .subscribe(async u => {
                        this.user = await u;
                        callback();
                        // this.authService.subUser = await this.subUser;
                        await this.toastService.dismissLoading();
                    });
            })
            .catch((error) => {
                this.toastService.presentWarningToast('Error!', error);
                this.toastService.dismissLoading();
            });
    }
}
