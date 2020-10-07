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
import {Platform} from '@ionic/angular';
import {Plugins} from '@capacitor/core';
import {StorageService} from '../storage/storage.service';

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
                private toastService: ToastService,
                private platform: Platform,
                private storageService: StorageService) {
        this.userCollection = afs.collection<User>('users');
    }

    /**
     * copy and prepare
     * @param user user to be edited
     */
    private static copyAndPrepare(user: User): User {
        const copy = {...user};
        delete copy.id;

        copy.nutzername = copy.nutzername || null;
        copy.email = copy.email || null;
        copy.googleAccount = copy.googleAccount || null;

        copy.emailBestaetigt = copy.emailBestaetigt || false;
        copy.isOnboarded = copy.isOnboarded || false;
        copy.gesamtzeit = copy.gesamtzeit || null;
        copy.historieLernmodus = copy.historieLernmodus || null;
        copy.historieFreiermodusName = copy.historieFreiermodusName || null;
        copy.historieFreiermodusAnzahl = copy.historieFreiermodusAnzahl || null;
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
     * Method to update the user's credential in the database
     * @param user user
     * @param passwort user's new password
     */
    async update(user: User, passwort: string) {
        const u = firebase.auth().currentUser;
        this.toastService.presentLoading('Profil wird aktualisiert...')
            .then(async () => {
                if (user.googleAccount && !this.platform.is('android')) {
                    await u.reauthenticateWithPopup(new auth.GoogleAuthProvider());
                }
                if (user.googleAccount && this.platform.is('android')) {
                    const googleUser = await Plugins.GoogleAuth.signIn();
                    const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
                    await u.reauthenticateWithCredential(credential);
                }
                if (u.email !== user.email) {
                    await u.updateEmail(user.email)
                        .then(async () => {
                            this.user.isVerified = false;
                            await u.sendEmailVerification();
                            await this.logOut();
                            await this.toastService.presentToast('Bitte E-Mail bestätigen und erneut authentifizieren.');
                        })
                        .catch((error) => {
                            this.toastService.presentWarningToast('Error!', error);
                        });
                }
                if (passwort) {
                    await u.updatePassword(passwort)
                        .catch((error) => {
                            this.toastService.presentWarningToast('Error!', error);
                        });
                }
                await u.updateProfile({displayName: user.nutzername})
                    .catch(error => {
                        this.toastService.presentWarningToast('Error!', error);
                    });
                await this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
                await this.toastService.presentToast('Profil erfolgreich aktualisiert.');
                await this.toastService.dismissLoading();
            });
    }

    /**
     * Method to update the user's data in the database
     * @param user user
     */
    async updateProfile(user: User) {
        await this.userCollection.doc(user.id).update(AuthService.copyAndPrepare(user));
    }

    /**
     * Method to delete a user in the database
     * @param user user to be deleted
     */
    async deleteProfile(user: User) {
        await this.toastService.presentLoading('Bitte warten. \n Dies kann einige Sekunden dauern.')
            .then(async () => {
                const u = firebase.auth().currentUser;
                if (user.googleAccount && !this.platform.is('android')) {
                    await u.reauthenticateWithPopup(new auth.GoogleAuthProvider());
                }
                if (user.googleAccount && this.platform.is('android')) {
                    const googleUser = await Plugins.GoogleAuth.signIn();
                    const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
                    await u.reauthenticateWithCredential(credential);
                }
                await this.logOut();
                await u.delete();
                await this.userCollection.doc(user.id).delete();
            }).catch(err => {
                this.toastService.dismissLoading();
                this.toastService.presentWarningToast(Error, err);
            });
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
     * @return Promise<boolean> true, if logged in (ID stored in local storage / session storage)
     */
    checkIfLoggedIn(): Promise<boolean> {
        return new Promise((resolve) => {
            this.loadPageSubscription((u) => {
                if (u === undefined || u.id === undefined) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Method to sign out a user
     */
    logOut() {
        this.afAuth.signOut().then(() => {
            this.isLoggedIn = false;
            this.user = undefined;
            this.storageService.fragen = [];
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
        await this.afAuth.createUserWithEmailAndPassword(email, passwort)
            .then(async res => {
                this.isLoggedIn = true;
                this.persist(new User(nutzername, email, false), res.user.uid);

                this.subUser = this.findById(res.user.uid)
                    .subscribe(u => {
                        this.user = u;
                    });
                localStorage.setItem('userID', res.user.uid);
                await firebase.auth().currentUser.sendEmailVerification();
                await this.router.navigate(['/startseite']);
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
     * Method to provide google authentication credentials
     */
    async GoogleAuthCredential() {
        const googleUser = await Plugins.GoogleAuth.signIn();
        const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
        return this.androidGoogleSignIn(credential);
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

                                this.user = new User(result.user.displayName, result.user.email, true);
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

    async androidGoogleSignIn(credential): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this.toastService.presentLoading('Bitte warten...');
            return this.afAuth.signInWithCredential(credential)
                .then((result) => {
                    this.findById(result.user.uid)
                        .pipe(take(1))
                        .subscribe((res) => {
                            if (res.id !== undefined) {
                                localStorage.setItem('userID', result.user.uid);
                                this.isLoggedIn = true;
                                this.subUser = this.findById(res.id)
                                    .subscribe((u) => {
                                        this.user = u;
                                        this.toastService.dismissLoading();
                                        resolve();
                                    });
                            } else {
                                this.user = new User(result.user.displayName, result.user.email, true);
                                this.persist(AuthService.copyAndPrepare(this.user), result.user.uid);
                                localStorage.setItem('userID', result.user.uid);
                                this.isLoggedIn = true;
                                this.subUser = this.findById(result.user.uid)
                                    .subscribe((u) => {
                                        this.user = u;
                                        this.toastService.dismissLoading();
                                        resolve();
                                    });
                            }
                        });
                }).catch((error) => {
                    this.toastService.dismissLoading();
                    this.toastService.presentWarningToast('Error', error);
                    reject();
                });
        });
    }

    /***
     * This Method subscribes the User from From Firebase and saves it in the Service.
     * @param callback() is everytime called if the User in Firebase is changed.
     */
    async loadPageSubscription(callback: (u: User) => void) {
        let counter = true;
        if (this.getUserID()) {
            this.subUser = this.findById(this.getUserID())
                .subscribe(async u => {
                    this.user = await u;
                    if (counter) {
                        counter = false;
                        callback(this.user);
                        setTimeout(() => counter = true, 500);
                    }
                });
        } else {
            callback(undefined);
        }
    }

    /**
     * method to get the userId from logged In User
     */
    getUserID(): string {
        if (localStorage.getItem('userID')) {
            return localStorage.getItem('userID');
        } else if (sessionStorage.getItem('userID')) {
            return sessionStorage.getItem('userID');
        } else {
            return undefined;
        }
    }
}
