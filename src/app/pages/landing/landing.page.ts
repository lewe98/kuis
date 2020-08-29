import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss', './responsive.scss'],
})
export class LandingPage {
    @ViewChild('slideWithNav', {static: false}) slideWithNav: IonSlides;

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

    constructor(private authService: AuthService,
                private router: Router) {
    }

    googleLogin() {
        this.authService.GoogleAuth().then(() => {
            this.router.navigate(['/startseite']);
        });
    }

}
