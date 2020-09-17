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
    url = '';
    module = [];


    constructor(private afs: AngularFirestore,
                private toastService: ToastService) {
        this.modulCollection = afs.collection<Modul>('module');

        this.findAll();
    }

    getID(doc) {
        return {id: doc.id, ...doc.data()};
    }

    findAll() {
        this.afs.collection('module')
            .doc('42LVdVpFY7xQew72tsM5')
            .collection('musik-quiz')
            .get()
            .toPromise()
            .then(snapshot => {
                this.module = snapshot.docs.map(this.getID);
                console.log(this.module);
            });
    }

    async getPicture(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.toastService.presentLoading('Bitte warten...').then(() => {
                this.gsReference
                    .child(name)
                    .getDownloadURL()
                    .then(async (url) => {
                        this.url = await url;
                        resolve(url);
                        await this.toastService.dismissLoading();
                    }).catch((error) => {
                    this.toastService.presentWarningToast('Error', error);
                    this.toastService.dismissLoading();
                    reject(error);
                });
            });
        });
    }
}
