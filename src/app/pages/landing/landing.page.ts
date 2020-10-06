import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {IonSlides, Platform} from '@ionic/angular';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

    isOnline: boolean;

    sliderOne = {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
            {
                path: './assets/icon/quiz.svg',
                text: 'Teste dein Wissen!'
            },
            {
                path: './assets/icon/statistics.svg',
                text: 'Messe deinen Fortschritt!'
            },
            {
                path: './assets/icon/achievement.svg',
                text: 'Erreiche Abzeichen!'
            }
        ]
    };

    slidesOptions: any = {
        zoom: {
            toggle: false
        },
        initialSlide: 0,
        loop: true,
        slidesPerView: 1,
        autoplay: true,
        grabCursor: true
    };

    constructor(public authService: AuthService,
                private router: Router,
                public platform: Platform) {
    }

    ngOnInit() {
        this.isOnline = false;
        // If an user is found in Storage
        this.isOnline = (sessionStorage.getItem('userID') !== null) || (localStorage.getItem('userID') !== null);
        // dont allows to nav to loginpage while log in;
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
    }

    googleLogin() {
        if (this.platform.is('android')) {
            this.authService.GoogleAuthCredential().then(() => {
                this.router.navigate(['/startseite']);
            });
        } else {
            this.authService.GoogleAuth().then(() => {
                this.router.navigate(['/startseite']);
            });
        }

    }

}
