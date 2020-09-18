import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-statistik',
    templateUrl: './statistik.page.html',
    styleUrls: ['./statistik.page.scss'],
})
export class StatistikPage implements OnInit {

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
    }

}
