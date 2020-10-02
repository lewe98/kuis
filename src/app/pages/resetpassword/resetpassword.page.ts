import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonInput, ViewDidEnter} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit, ViewDidEnter {
  emailForPassReset: string;
  errors: Map<string, string> = new Map<string, string>();

  @ViewChild('email')
  private email: IonInput;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    setTimeout(() => this.email.setFocus(), 10);
  }

  async reset(emailForPassReset: string) {
    this.errors.clear();
    const auth = firebase.auth();
    await auth.sendPasswordResetEmail(emailForPassReset)
        .catch(async (error) => {
      if (error.code === 'auth/user-not-found') {
        this.errors.set('wrongData', 'Nutzer nicht gefunden');
      } else if (this.errors.size === 0) {
        const alert = await this.alertController.create({
          header: 'Passwort zurückgesetzt',
          message: 'Wir haben eine E-Mail an deine Adresse verschickt! Folge den Instruktionen der Mail.',
          buttons: ['Aye']
        });
        console.log('y u wont work');
        return alert.present();
      }
    });
  }
}
