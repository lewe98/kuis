import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastService} from '../../services/toast/toast.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit, ViewDidEnter {
  emailForPassReset: string;

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
    // To be implemented now!
  }
}
