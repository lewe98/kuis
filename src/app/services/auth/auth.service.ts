import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {ToastService} from '../toast/toast.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import * as firebase from 'firebase';
import {auth} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    subscriptions: Subscription[] = [];
    usersCollection: AngularFirestoreCollection<User>;
    private user: User = null;
    private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
    public userSubscription = this.userSubject.asObservable();

    constructor(public afAuth: AngularFireAuth,
                private fireStore: AngularFirestore,
                private router: Router,
                private toastService: ToastService,
                public platform: Platform) {
        this.usersCollection = fireStore.collection<User>('users');

        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.findById(user.uid).subscribe((u) => {
                    this.user = u;
                    this.user.emailBestaetigt = user.emailVerified;
                    this.userSubject.next(this.user);
                });
            } else {
                this.user = null;
                this.userSubject.next(this.user);
            }
        });
    }

    // COPY AND PREPARE

    private static copyAndPrepare(user: User): User {
        const copy = {...user};
        delete copy.id;

        copy.nutzername = copy.nutzername || null;
        copy.email = copy.email || null;
        copy.emailBestaetigt = copy.emailBestaetigt || null;
        copy.abzeichen = copy.abzeichen || null;
        copy.statistik = copy.statistik || null;
        copy.isOnboarded = copy.isOnboarded || null;
        copy.importierteModule = copy.importierteModule || null;

        return copy;
    }

    // CRUD
    /**
     * Method to persist the users data in the database
     */
    persist(user: User, id: string): void {
        this.usersCollection.doc(id).set(Object.assign({}, user));
    }

    /**
     * Method to find a user by id
     * @param id id of a user
     * @return promise
     */
    findById(id): Observable<User> {
        const changeAction = this.usersCollection.doc<User>(id);
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
     * Method to update the users data in the database
     * @return promise
     */
    update(user: User, id: string) {
        return new Promise<any>((resolve, reject) => {
            this.usersCollection.doc(id).update(user).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Method to delete a profile
     * @param email mail address of a user
     * @param password password of a user
     */
    delete(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.delete();
                firebase.auth().signOut();
            });
    }

    // GOOGLE LOGIN

    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }


    AuthLogin(provider): Promise<any> {
        return new Promise((resolve, reject) => {
            this.afAuth.signInWithPopup(provider)
                .then((result) => {
                    this.findById(result.user.uid).pipe(take(1)).subscribe((res) => {
                        if (res.id !== undefined) {
                            this.subscriptions.push(this.findById(res.id).subscribe((user) => {
                                this.user = user;
                                this.userSubject.next(user);
                                resolve();
                            }));
                        } else {
                            const u = new User();
                            u.nutzername = result.user.displayName;
                            u.email = result.user.email;
                            this.user = u;
                            this.user.emailBestaetigt = true;
                            this.persist(AuthService.copyAndPrepare(this.user), result.user.uid);
                            this.subscriptions.push(this.findById(result.user.uid).subscribe((user) => {
                                this.user = user;
                                this.userSubject.next(user);
                                resolve();
                            }));
                        }
                    });
                }).catch((error) => {
                this.toastService.presentWarningToast('Error ', error);
                reject();
            });
        });
    }

    // REGISTER
    /**
     * Method to register a new user
     * @param username username of a user
     * @param email mail address of a user
     * @param password password of a user
     * @return promise
     */
    register(username, email, password): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // entweder: firebase.auth().createUserWithEmailAndPassword(email, password)
            // oder:
            this.afAuth.createUserWithEmailAndPassword(email, email)
                .then((result) => {

                    const u = new User();
                    u.nutzername = username;
                    u.email = email;
                    u.passwort = password;

                    this.persist(AuthService.copyAndPrepare(u), result.user.uid);
                    this.SendVerificationMail().then(() => {
                        firebase.auth().signOut();
                        resolve();
                    });
                }).catch((error) => {
                alert(error);
                reject(error);
            });
        });
    }

    /**
     * Method to send a verification mail in order to register
     */
    SendVerificationMail() {
        const actionCodeSettings = {
            url: window.location.href,
            handleCodeInApp: true
        };
        return firebase.auth().sendSignInLinkToEmail(this.user.email, actionCodeSettings);
    }

    // EDIT
    /**
     * Method to change the mail address
     * @param email mail address of a user
     * @param password password of a user
     * @param newemail new mail address
     * @return promise
     */
    changeEmail(email, password, newemail) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(
                    res => {
                        firebase.auth().currentUser.updateEmail(newemail);
                        resolve(res);
                    },
                    err => reject(err));
        });
    }

    /**
     * Method to change the password
     * @param email mail address of a user
     * @param password password of a user
     * @param newpassword new password
     * @return promise
     */
    changePassword(email, password, newpassword) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(
                    res => {
                        firebase.auth().currentUser.updatePassword(newpassword);
                        resolve(res);
                    },
                    err => reject(err));
        });
    }

}
