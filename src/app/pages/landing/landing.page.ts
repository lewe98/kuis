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

    /**
     * Sets the isOnline boolean to false until a UserID is found in the Storage.
     * If a User is found, the User will be redirected to the main menu.
     */
    ngOnInit() {
        this.isOnline = false;
        this.isOnline = (sessionStorage.getItem('userID') !== null) || (localStorage.getItem('userID') !== null);
        if (this.isOnline) {
            this.router.navigate(['/startseite']);
        }
    }

    /**
     * Makes it possible to let Users authenticate with their Google Account.
     * Redirects to the Google Authentication which is handled by an exterior service.
     */
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
