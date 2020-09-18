import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModulService {
    modulCollection: AngularFirestoreCollection<Modul>;
    module = [];
    isLernmodus = false;

    constructor(private afs: AngularFirestore,
                private storageService: StorageService) {
        this.modulCollection = afs.collection<Modul>('module');
        this.findAllModule().subscribe(data => {
            this.module = data;
        });
    }

    toggleLernmodus() {
        this.isLernmodus = true;
    }

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

    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    findImportedModule(): Observable<Modul[]> {
        const changeActions: Observable<DocumentChangeAction<Modul>[]> =
            this.modulCollection.snapshotChanges();
        return changeActions.pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                this.storageService.getPicture(data.bild).then((url) => {
                    data.bild = url;
                });
                return data;
            })));
        /* this.afs.collection('module')
            .get()
            .toPromise()
            .then(snapshot => {
              this.module = snapshot.docs.map(this.getID);
              this.module.forEach((elem) => {
                this.getPicture(elem.bild).then((url) => {
                  elem.bild = url;
                });
              });
            });
         */
    }
}
