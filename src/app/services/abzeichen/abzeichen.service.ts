import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Abzeichen} from '../../models/abzeichen';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {ToastService} from '../toast/toast.service';


@Injectable({
    providedIn: 'root'
})
export class AbzeichenService {

    abzeichen: Abzeichen[];
    subUser: Subscription;
    abzeichenCollection: AngularFirestoreCollection<Abzeichen>;

    constructor(private afs: AngularFirestore,
                private authService: AuthService,
                private toastService: ToastService) {
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

    checkAbzeichen(timer: number, abzeichenArray: Abzeichen[]) {
        const anzahl = this.authService.user.historieLernmodus.length;

        // 60 Sekunden
        if (timer <= 60 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[0].id) &&
            this.authService.user.historieLernmodus[anzahl - 1] === 10) {
            this.authService.user.abzeichen.push(abzeichenArray[0].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[0].titel);
        }

        // 45 Sekunden
        if (timer <= 45 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[1].id) &&
            this.authService.user.historieLernmodus[anzahl - 1] === 10) {
            this.authService.user.abzeichen.push(abzeichenArray[1].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[1].titel);
        }

        // 30 Sekunden
        if (timer <= 30 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[2].id) &&
            this.authService.user.historieLernmodus[anzahl - 1] === 10) {
            this.authService.user.abzeichen.push(abzeichenArray[2].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[2].titel);
        }

        // Eine Lernrunde abgeschlossen.
        if (this.authService.user.historieLernmodus.length >= 1 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[3].id)) {
            this.authService.user.abzeichen.push(abzeichenArray[3].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[3].titel);
        }

        // 10 Lernrunden abgeschlossen.
        if (this.authService.user.historieLernmodus.length >= 10 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[4].id)) {
            this.authService.user.abzeichen.push(abzeichenArray[4].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[4].titel);
        }

        // 50 Lernrunden abgeschlossen.
        if (this.authService.user.historieLernmodus.length >= 50 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[5].id)) {
            this.authService.user.abzeichen.push(abzeichenArray[5].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[5].titel);
        }

        // Lernrunde ohne Fehler abschließen.
        if (this.authService.user.historieLernmodus[anzahl] === 10 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[6].id)) {
            this.authService.user.abzeichen.push(abzeichenArray[6].id);
            this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[6].titel);
        }

        // 5 Lernrunden ohne Fehler abschließen.
        if (this.authService.user.historieLernmodus.length >= 5 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[7].id)) {
            let counter = 0;
            for (let i = this.authService.user.historieLernmodus.length - 1;
                 i >= this.authService.user.historieLernmodus.length - 5; i--) {
                if (this.authService.user.historieLernmodus[i] === 10) {
                    counter++;
                    if (counter === 5) {
                        this.authService.user.abzeichen.push(abzeichenArray[7].id);
                        this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[7].titel);
                    }
                } else {
                    break;
                }
            }
        }

        // 10 Lernrunden ohne Fehler abschließen.
        if (this.authService.user.historieLernmodus.length >= 10 &&
            !this.authService.user.abzeichen.find(a => a === abzeichenArray[8].id)) {
            let counter = 0;
            for (let i = this.authService.user.historieLernmodus.length - 1;
                 i >= this.authService.user.historieLernmodus.length - 10; i--) {
                if (this.authService.user.historieLernmodus[i] === 10) {
                    counter++;
                    if (counter === 10) {
                        this.authService.user.abzeichen.push(abzeichenArray[8].id);
                        this.toastService.presentToast('Neues Abzeichen erreicht!\n' + abzeichenArray[8].titel);
                    }
                } else {
                    break;
                }
            }
        }


        this.authService.updateProfile(this.authService.user);
    }
}
