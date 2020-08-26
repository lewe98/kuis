import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  @Input()isSignedInFromLogIn: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}

    handleLogout() {
      this.authService.logOut();
      this.router.navigate(['/login']);
    }

}
