import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastService} from '../../services/toast/toast.service';
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

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    setTimeout(() => this.email.setFocus(), 10);
  }

  async reset(emailForPassReset: string) {
    this.errors.clear();
    const auth = firebase.auth();
    await auth.sendPasswordResetEmail(emailForPassReset)
        .catch((error) => {
      this.toastService.dismissLoading();
      console.log(error);
    })
        .then(() => {
      console.log('email sent');
    });
  }
}
