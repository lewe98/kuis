import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Abzeichen} from '../../models/abzeichen';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AbzeichenService {

    abzeichen: Abzeichen[];
    subUser: Subscription;
    abzeichenCollection: AngularFirestoreCollection<Abzeichen>;

    constructor(private afs: AngularFirestore) {
        this.abzeichenCollection = afs.collection<Abzeichen>('abzeichen');
        this.findAllAbzeichen().subscribe(data => {
            this.abzeichen = data;
        });
    }

    /***
     * This Method returns a Observable of all 'Abzeichen'.
     * @return Observable<Abzeichen[]> are all of the 'Abzeichen' in the Database.
     */
    findAllAbzeichen(): Observable<Abzeichen[]> {
        const changeActions: Observable<DocumentChangeAction<Abzeichen>[]> =
            this.abzeichenCollection.snapshotChanges();
        return changeActions.pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            })));
    }
    getAbzeichen(): Abzeichen[] {
        return this.abzeichen;
    }
}
