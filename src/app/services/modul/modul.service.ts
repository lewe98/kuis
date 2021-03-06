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
import {ToastService} from '../toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class ModulService {
    modulCollection: AngularFirestoreCollection<Modul>;
    module: Modul[] = [];
    importedModule: Modul[] = [];
    filteredModules: Modul[] = [];
    sortiert = 'zuletztGespielt';
    filter = 'keinFilter';
    subModule: Subscription;
    noImportedModules = true;
    isLernmodus = false;
    started = false;
    isFreiermodus = false;
    disableStart = false;

    constructor(private afs: AngularFirestore,
                private storageService: StorageService,
                private authService: AuthService,
                private abzeichenService: AbzeichenService,
                private toastService: ToastService) {
        this.modulCollection = afs.collection<Modul>('module');
    }

    /**
     * Method to mark the quiz as "Lernmodus"
     */
    toggleLernmodus() {
        this.isLernmodus = true;
    }

    /***
     * This method gets all quiz-modules from Firebase.
     * @return Observable<Modul[]> Observable Stream of the quiz-modules in the Firebase database.
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
     * Method to load all imported quiz-modules of a user.
     */
    loadImportedModule() {
        this.module = [];
        this.importedModule = [];
        this.filteredModules = [];
        // this.subModule = this.findAllModule()
        //     .subscribe(async data => {
        //         await data.map(modul => {
        //             if (this.authService.getUser().importierteModule.length) {
        //                 this.authService.getUser().importierteModule.forEach(imported => {
        //                     if (modul.id === imported.id) {
        //                         this.module.push(imported);
        //                         console.log(this.module);
        //                     }
        //                 });
        //                 this.noImportedModules = false;
        //             } else {
        //                 this.noImportedModules = true;
        //             }
        //         });
        //         this.sortModule({target: {value: this.sortiert}});
        //     });
        if (this.authService.getUser().importierteModule.length) {
            this.authService.getUser().importierteModule.forEach(imported => {
                this.module.push(imported);
                this.noImportedModules = false;
            });
        } else {
            this.noImportedModules = true;
        }
        this.sortModule({target: {value: this.sortiert}});
    }


    /**
     * Method to get all imported Modules from the current user
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
     * Method to add an imported quiz-module to an user and updates the user in the Firebase database.
     * @param modul is the quiz-module that will be added to the imported quiz-modules in the user's array.
     */
    importModule(modul: Modul) {
        const newUser = this.authService.getUser();
        modul.bestResult = 0;
        newUser.importierteModule.push(modul);
        this.authService.updateProfile(newUser);
    }

    /**
     * Converts a "hilfsObjektFragen" object to Firestore format
     * @param object - the "hilfsObjektFragen"
     */
    toFirestore(object: HilfsObjektFrage): firebase.firestore.DocumentData {
        return {id: object.id, counter: object.counter, idModul: object.idModul};
    }

    /**
     * Converts a "AlreadyLearned" object to Firestore format
     * @param object - the "AlreadyLearned-Object"
     */
    alreadyLearnedToFirestore(object: AlreadyLearned): firebase.firestore.DocumentData {
        return {idModul: object.idModul, idQuestion: object.idQuestion};
    }


    /**
     * Preparation to update a user with an "alreadyLearned" object
     * @param object formatted object
     */
    addAlreadyLearned(object: any) {
        const newUser = this.authService.getUser();
        newUser.alreadyLearned.push(this.alreadyLearnedToFirestore(object));
    }

    /**
     * The Method filters the Modules between 'nichtBearbeitet' and 'allesRichtig'.
     * @param $event is an object that needs a value of nichtAbgeschlossen, allesRichtig or a default if no filter is needed.
     * an event Object has to look like: {target: {value: 'value'}}.
     */
    filterModule($event) {
        const filter = $event.target.value;
        switch (filter) {
            case 'nichtAbgeschlossen':
                this.filter = 'nichtAbgeschlossen';
                this.importedModule = this.module.filter(modul => modul.bestResult !== modul.anzahlFragen);
                this.filteredModules = this.importedModule;
                break;
            case 'allesRichtig':
                this.filter = 'allesRichtig';
                this.importedModule = this.module.filter(modul => modul.bestResult === modul.anzahlFragen);
                this.filteredModules = this.importedModule;
                break;
            default:
                this.filter = 'keinFilter';
                this.setModuleEqual();
        }
    }

    /**
     * This method sorts the this.module array ASC, DESC, after the date of adding the quiz-modules or after the date of the last game.
     * @param $event is an Object that needs a value of zuletztGespielt, absteigend, aufsteigend, hinzugefügt or
     * a default same as zuletztGespielt.
     * a event Object has to look like: {target: {value: 'value'}}.
     */
    sortModule($event) {
        this.sortiert = $event.target.value;
        switch (this.sortiert) {
            case 'zuletztGespielt':
                this.module = this.module.sort((a, b) => {
                        return new Date(b.zuletztGespielt).getTime() - new Date(a.zuletztGespielt).getTime();
                });
                this.filterModule({target: {value: this.filter}});
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
                this.filterModule({target: {value: this.filter}});
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
                this.filterModule({target: {value: this.filter}});
                break;
            case 'hinzugefügt':
                this.module = this.module.sort((a, b) => {
                    return new Date(b.hinzugefuegt).getTime() - new Date(a.hinzugefuegt).getTime();
                });
                this.filterModule({target: {value: this.filter}});
                break;
            default:
                this.sortiert = 'zuletztGespielt';
                this.module = this.module.sort((a, b) =>
                    new Date(b.zuletztGespielt).getTime() - new Date(a.zuletztGespielt).getTime());
                this.filterModule({target: {value: this.filter}});
        }
    }

    /**
     * Method to delete an imported quiz-module from the user
     * @param module - the module the user want delete
     */
    deleteModule(module: Modul) {
        this.disableStart = true;
        const user = this.authService.getUser();
        const removeIndex = user.importierteModule.map(item => item.id).indexOf(module.id);
        if (removeIndex >= 0) {
            for (let i = user.availableQuestions.length; i > 0; i--) {
                if (user.availableQuestions[i - 1].idModul === module.id) {
                    user.availableQuestions.splice(i - 1, 1);
                }
            }
            for (let j = user.alreadyLearned.length; j > 0; j--) {
                if (user.alreadyLearned[j - 1].idModul === module.id) {
                    user.alreadyLearned.splice(j - 1, 1);
                }
            }
            this.toastService.presentLoadingDuration(module.name + '-Quiz zum löschen vorbereitet', 1000)
                .then(() => {
                    user.importierteModule.splice(removeIndex, 1);
                    this.abzeichenService.checkAbzeichenModulGeloescht();
                    this.authService.updateProfile(user);
                    this.toastService.presentToastSuccess(module.name + '-Quiz wurde gelöscht!');
                });
        }
        setTimeout(() => {
            this.disableStart = false;
        }, 2000);
    }

    /**
     * Empties the imported and filtered modules and sets them equal.
     */
    setModuleEqual() {
        this.importedModule = [];
        this.filteredModules = [];
        this.module.forEach(modul => {
            this.importedModule.push(modul);
            this.filteredModules.push(modul);
        });
    }
}
