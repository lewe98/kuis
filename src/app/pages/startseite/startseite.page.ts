import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-startseite',
    templateUrl: './startseite.page.html',
    styleUrls: ['./startseite.page.scss'],
})
export class StartseitePage implements OnInit {

    constructor(private router: Router) {
    }
    routerNavigate(route: string) {
        this.router.navigate([route]);
    }

    ngOnInit() {
    }
}
