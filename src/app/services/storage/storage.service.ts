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

    /***
     * Method to get the ID of a certain document
     * @param doc
     */
    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    /***
     * Method to find all questions of a certain quiz-module
     * @param id ID of the quiz-module
     * @param titel title of the quiz-module
     * @param name name of the quiz-module
     */
    findAllFragen(id: string, titel: string, name: string): Promise<any> {
        return new Promise((resolve) => {
            this.afs.collection('module')
                .doc(id)
                .collection(titel)
                .get()
                .toPromise()
                .then(snapshot => {
                    this.nameDesModuls = name;
                    this.fragen = snapshot.docs.map(this.getID);
                    resolve();
                });
        });
    }

    /***
     * Method to find all fragen for the "Lernmodus"
     * @param id ID of the quiz-module
     * @param name Name of the quiz-module
     */
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

    /***
     * Method to receive the url of a picture in the Firebase storage
     * @param name Name of the picture
     * @return Promise<any> resolves the URL of the picture
     */
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
