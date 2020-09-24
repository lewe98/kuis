import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    storage = firebase.storage();
    gsReference = this.storage.refFromURL('gs://pictures-app-68662.appspot.com/');
    modulCollection: AngularFirestoreCollection<Modul>;
    nameDesModuls = '';
    fragen = [];

    constructor(private afs: AngularFirestore) {
        this.modulCollection = afs.collection<Modul>('module');
    }

    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    findAllFragen(id: string, name: string): Promise<any> {
        return new Promise((resolve) => {
            this.afs.collection('module')
                .doc(id)
                .collection(name)
                .get()
                .toPromise()
                .then(snapshot => {
                    this.nameDesModuls = name;
                    this.fragen = snapshot.docs.map(this.getID);
                    resolve();
                });
        });
    }

    findAllFragenLernmodus(id: string, name: string): Promise<any> {
        return new Promise<any>(resolve => {
            this.afs.collection('module')
                .doc(id)
                .collection(name)
                .get()
                .toPromise()
                .then(snapshot => {
                    this.fragen = snapshot.docs.map(this.getID);
                    resolve();
                });
        });
    }

    async getPicture(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.gsReference
                .child(name)
                .getDownloadURL()
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
