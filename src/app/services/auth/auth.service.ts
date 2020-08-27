import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Observable, Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    subs: Subscription[] = [];
    user: User;
    isLoggedIn = false;
    userCollection: AngularFirestoreCollection<User>;

    constructor(private router: Router,
                private afs: AngularFirestore,
                private afAuth: AngularFireAuth) {
        this.userCollection = afs.collection<User>('users');

        if (this.checkIfLoggedIn()) {
            this.afAuth.authState.subscribe(user => {
                if (user) {
                    this.subs.push(this.findById(user.uid).subscribe(u => {
                        this.user = u;
                    }));
                }
            });
        }
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

    checkIfLoggedIn() {
        return this.afAuth.authState.pipe(first());
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
     * @return promise
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
     * Method to delete a user
     * @param user user to be deleted
     */
    delete(user: User): void {
        this.userCollection.doc(user.id).delete();
        this.logOut();
    }

    // LOGIN

    async signIn(email: string, password: string) {
        // await this.afAuth.signInWithEmailAndPassword(email, bcrypt.hashSync(password, bcrypt.genSaltSync(10))).then(res => {
        await this.afAuth.signInWithEmailAndPassword(email, password).then(res => {

            this.isLoggedIn = true;

            this.subs.push(this.findById(res.user.uid).subscribe(u => {
                this.user = u;
            }));

            localStorage.setItem('userID', JSON.stringify(res.user.uid));
        });
    }

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
        localStorage.removeItem('userID');
    }

    // REGISTER

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
}
