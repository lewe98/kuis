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

        /*
        afs.collection('modules/42LVdVpFY7xQew72tsM5/musik-quiz')
             .get()
             .subscribe(elem => {
                 console.log(elem);
             });

         this.findAll().subscribe(data => {
             this.module = data;
             console.log('Data: ' + JSON.stringify(data));
         });
         */
    }

    /*
    findAll(): Observable<Modul[]> {
         const changeActions: Observable<DocumentChangeAction<Modul>[]> =
             this.modulCollection.snapshotChanges();
         const lol = this.afs.collection('modules/42LVdVpFY7xQew72tsM5/musik-quiz');

         return changeActions.pipe(
             map(actions => actions.map(a => {
                 const data = a.payload.doc.data();
                 data.id = a.payload.doc.id;
                 return data;
             })));
     }
     */

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

    async getPicture(name: string) {
        await this.toastService.presentLoading('Bitte warten...').then(() => {
            this.gsReference
                .child(name)
                .getDownloadURL()
                .then((url) => {
                    this.url = url;
                    this.toastService.dismissLoading();
                }).catch((error) => {
                this.toastService.presentWarningToast('Error', error);
                this.toastService.dismissLoading();
            });
        });

    }
}
