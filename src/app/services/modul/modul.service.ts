import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';
import {AuthService} from '../auth/auth.service';
import {HilfsObjektFrage} from '../../models/hilfsObjektFrage';

@Injectable({
  providedIn: 'root'
})
export class ModulService {
    modulCollection: AngularFirestoreCollection<Modul>;
    module = [];
    isLernmodus = false;
    started = false;

    constructor(private afs: AngularFirestore,
                private storageService: StorageService,
                private authService: AuthService) {
        this.modulCollection = afs.collection<Modul>('module');
        this.findAllModule().subscribe(data => {
            this.module = data;
        });
    }

    /**
     * Method to mark the quiz as Lernmodus
     */
    toggleLernmodus() {
        this.isLernmodus = true;
    }

    /***
     * This Method gets all Modules from Firebase.
     * @return is a Observable Stream of the Module in the Firebase Database.
     */
    findAllModule(): Observable<Modul[]> {
        const changeActions: Observable<DocumentChangeAction<Modul>[]> =
            this.modulCollection.snapshotChanges();
        return changeActions.pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                if (!this.isLernmodus) {
                    this.storageService.getPicture(data.bild).then((url) => {
                        data.bild = url;
                    });
                }
                return data;
            })));
    }

    /**
     * Method to get all imported Modules from the current loggin in user
     */
    findAllModuleLernmodus(): Promise<any> {
        return new Promise<any>((resolve) => {
            this.afs.collection('module')
                .get()
                .toPromise()
                .then(snapshot => {
                    resolve(snapshot.docs.map(this.getID));
                });
        });
    }

    /**
     * Method to get the ids of the documents
     * @param doc - the document in the firestore
     */
    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    importModule(modul: Modul) {
        const newUser = this.authService.getUser();
        console.log(modul);
        newUser.importierteModule.push(modul);
        this.authService.updateProfile(newUser);
    }

    /**
     * Converts a hilfsObjektFragen Object to Firestore Format
     * @param object - the hilfsObjektFragen
     */
    toFirestore(object: HilfsObjektFrage): firebase.firestore.DocumentData {
        return {id: object.id, counter: object.counter};
    }


    addQuestion(hilfsobject: any){
        const newUser = this.authService.getUser();
        newUser.availableQuestions.push(this.toFirestore(hilfsobject));
    }
}
