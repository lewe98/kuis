import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';
import {AuthService} from '../auth/auth.service';
import {HilfsObjektFrage} from '../../models/hilfsObjektFrage';
import {AlreadyLearned} from '../../models/alreadyLearned';
import {AbzeichenService} from '../abzeichen/abzeichen.service';

@Injectable({
    providedIn: 'root'
})
export class ModulService {
    modulCollection: AngularFirestoreCollection<Modul>;
    module: Modul[] = [];
    importedModule: Modul[] = [];
    filteredModules: Modul[] = [];
    sortiert = 'zuletztGespielt';
    subModule: Subscription;
    noImportedModules = true;
    isLernmodus = false;
    started = false;

    constructor(private afs: AngularFirestore,
                private storageService: StorageService,
                private authService: AuthService,
                private abzeichenService: AbzeichenService) {
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
        const changeActions: Observable<DocumentChangeAction<Modul>[]> = this.modulCollection.snapshotChanges();
        return changeActions.pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            })));
    }

    /**
     * Method loads all imported Modules of a user and subscribes to the FirebaseCollection of the Modules.
     */
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
                                this.module.push(imported);
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
        modul.bestResult = 0;
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

    /**
     * Converts a AlreadyLearned Object to Firestore Format
     * @param object - the AlreadyLearned-Object
     */
    alreadyLearnedToFirestore(object: AlreadyLearned): firebase.firestore.DocumentData {
        return {idModul: object.idModul, idQuestion: object.idQuestion};
    }


    /**
     * Preparation to update user with an alreadyLearned object
     * @param object formated object
     */
    addAlreadyLearned(object: any) {
        const newUser = this.authService.getUser();
        newUser.alreadyLearned.push(this.alreadyLearnedToFirestore(object));
    }

    /**
     * The Method filters the Modules between 'nichtBearbeitet' and 'alleRichtig'.
     * @param $event is an Object that needs a value of nichtBearbeitet, alleRichtig or a default if no filter is needed.
     * a event Object has to look like: {target: {value: 'value'}}.
     */
    filterModule($event) {
        const filter = $event.target.value;
        switch (filter) {
            case 'nichtBearbeitet':
                this.importedModule = this.module.filter(modul => modul.zuletztGespielt === '1995-12-17T03:24:00');
                this.filteredModules = this.importedModule;
                break;
            case 'alleRichtig':
                this.importedModule = this.module.filter(modul => modul.richtigeFragenLetztesSpiel === modul.anzahlFragen);
                this.filteredModules = this.importedModule;

                break;
            default:
                this.setModuleEqual();
        }
    }

    sortModule($event) {
        this.sortiert = $event.target.value;
        switch (this.sortiert) {
            case 'zuletztGespielt':
                this.module = this.module.sort((a, b) =>
                    new Date(b.zuletztGespielt).getMilliseconds() - new Date(a.zuletztGespielt).getMilliseconds());
                this.setModuleEqual();
                break;
            case 'absteigend':
                this.module = this.module.sort((a, b) => {
                    if (a.titel > b.titel) {
                        return -1;
                    }
                    if (a.titel < b.titel) {
                        return 1;
                    }
                    return 0;
                });
                this.setModuleEqual();
                break;
            case 'aufsteigend':
                this.module = this.module.sort((a, b) => {
                    if (a.titel < b.titel) {
                        return -1;
                    }
                    if (a.titel > b.titel) {
                        return 1;
                    }
                    return 0;
                });
                this.setModuleEqual();
                break;
            case 'hinzugefügt':
                this.module = this.module.sort((a, b) => {
                    return new Date(b.hinzugefuegt).getTime() - new Date(a.hinzugefuegt).getTime();
                });
                this.setModuleEqual();
                break;
            default:
                this.sortiert = 'zuletztGespielt';
                this.module = this.module.sort((a, b) =>
                    new Date(b.zuletztGespielt).getTime() - new Date(a.zuletztGespielt).getTime());
                this.setModuleEqual();
        }
    }

    /**
     * delete imported modules from logged in user
     * @param moduleID - the module the user want delete
     */
    deleteModule(moduleID) {
        const user = this.authService.getUser();
        const removeIndex = user.importierteModule.map(item => item.id).indexOf(moduleID);
        if (removeIndex >= 0) {
            for (let i = user.availableQuestions.length; i > 0; i--) {
                if (user.availableQuestions[i - 1].idModul === moduleID) {
                    user.availableQuestions.splice(i - 1, 1);
                }
            }
            for (let j = user.alreadyLearned.length; j > 0; j--) {
                if (user.alreadyLearned[j - 1].idModul === moduleID) {
                    user.alreadyLearned.splice(j - 1, 1);
                }
            }
            user.importierteModule.splice(removeIndex, 1);
            this.abzeichenService.checkAbzeichenModulGeloescht();
            this.authService.updateProfile(user);
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
