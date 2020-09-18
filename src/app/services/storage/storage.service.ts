import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {ToastService} from '../toast/toast.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Modul} from '../../models/modul';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    storage = firebase.storage();
    gsReference = this.storage.refFromURL('gs://pictures-app-68662.appspot.com/');
    modulCollection: AngularFirestoreCollection<Modul>;
    module = [];
    fragen = [];
    url = '';

    constructor(private afs: AngularFirestore,
                private toastService: ToastService) {
        this.modulCollection = afs.collection<Modul>('module');
    }

    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    findAll(id: string, name: string): Promise<any> {
        return new Promise((resolve) => {
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
                    this.url = url;
                    // this.toastService.dismissLoading();
                    resolve(url);
                })
                .catch((error) => {
                    // this.toastService.presentWarningToast('Error', error);
                    // this.toastService.dismissLoading();
                    reject(error);
                });

            /* this.toastService.presentLoading('Bitte warten...')
                 .then(() => {
        });
        */
        });
    }
}
