import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';
import {Observable, Subscription} from 'rxjs';
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
    importedModule = [];
    filteredModules = [];
    sortiert: string;
    subModule: Subscription;
    noImportedModules = true;
    isLernmodus = false;
    started = false;

    constructor(private afs: AngularFirestore,
                private storageService: StorageService,
                private authService: AuthService) {
        this.modulCollection = afs.collection<Modul>('module');
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

    loadImportedModule() {
        this.module = [];
        this.importedModule = [];
        this.filteredModules = [];
        this.subModule = this.findAllModule()
            .subscribe(async data => {
                await data.map(modul => {
                    if (this.authService.getUser().importierteModule.length) {
                        this.authService.getUser().importierteModule.forEach(imported => {
                            if (modul.id === imported.id) {
                                this.module.push(modul);
                            }
                        });
                        this.noImportedModules = false;
                    } else {
                        this.noImportedModules = true;
                    }
                });
                this.setModuleEqual();
                this.sortModule({target: {value: this.sortiert}});
            });
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

    /**
     * Method adds a imported Module to a user and Updates the User in the Firebase Database.
     * @param modul is the Module that will be added to the Imported Moduls in the User.
     */
    importModule(modul: Modul) {
        const newUser = this.authService.getUser();
        newUser.importierteModule.push(modul);
        this.authService.updateProfile(newUser);
    }

    /**
     * Converts a hilfsObjektFragen Object to Firestore Format
     * @param object - the hilfsObjektFragen
     */
    toFirestore(object: HilfsObjektFrage): firebase.firestore.DocumentData {
        return {id: object.id, counter: object.counter, idModul: object.idModul};
    }


    addQuestion(hilfsobject: any){
        const newUser = this.authService.getUser();
        newUser.availableQuestions.push(this.toFirestore(hilfsobject));
    }

    filterModule($event) {
        const filter = $event.target.value;
        switch (filter) {
            case 'nichtBearbeitet':
                this.importedModule = this.module.filter(modul => modul.richtigeFragenLetztesSpiel === 0);
                break;
            case 'alleRichtig':
                this.importedModule = this.module.filter(modul => modul.richtigeFragenLetztesSpiel === modul.anzahlFragen);
                break;
            default:
                this.setModuleEqual();
        }
    }

    sortModule($event) {
        console.log($event.target.value);
        this.sortiert = $event.target.value;
        switch (this.sortiert) {
            case 'zuletztGespielt':
                this.module = this.importedModule.sort((a, b) => b.zuletztGespielt.getDate() - a.zuletztGespielt.getDate());
                this.setModuleEqual();
                break;
            case 'absteigend':
                this.module = this.module.sort((a, b) => {
                    if (a.titel > b.titel) { return -1; }
                    if (a.titel < b.titel) { return 1; }
                    return 0;
                });
                this.setModuleEqual();
                break;
            case 'aufsteigend':
                this.module = this.module.sort((a, b) => {
                    if (a.titel < b.titel) { return -1; }
                    if (a.titel > b.titel) { return 1; }
                    return 0;
                });
                this.setModuleEqual();
                break;
            case 'hinzugefügt':
                this.module = this.module.sort((a, b) => b.hinzugefuegt.getDate() - a.hinzugefuegt.getDate());
                this.setModuleEqual();
                break;
            default:
                this.sortiert = 'zuletztGespielt';
                this.importedModule = this.module.sort((a, b) => b.zuletztGespielt.getDate() - a.zuletztGespielt.getDate());
                this.setModuleEqual();
        }
    }

    setModuleEqual() {
        this.importedModule = [];
        this.filteredModules = [];
        this.module.forEach(modul => {
            this.importedModule.push(modul);
            this.filteredModules.push(modul);
        });
    }
}
