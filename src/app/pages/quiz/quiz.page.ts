import {Component, OnDestroy} from '@angular/core';
import {ModulService} from '../../services/modul/modul.service';
import {StorageService} from '../../services/storage/storage.service';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnDestroy {

    alleModule = [];
    alleFragen = [];
    lernmodusFragen = [];
    globalCounter = 0;
    sum = 0;
    genugFragen = false;
    correctQuestion = false;
    user: User;

    constructor(public modulService: ModulService,
                private storageService: StorageService,
                private authService: AuthService,
                private router: Router) {
        this.authService.loadPageSubscription(() => {
        });
        this.initialize();
        if (!modulService.isLernmodus && !modulService.isFreiermodus) {
            if (localStorage.getItem('modus') === 'frei') {
                this.router.navigate(['moduluebersicht']);
            } else {
                this.router.navigate(['startseite']);
            }
        }
    }

    /**
     * sets on Destroy the boolean to false
     */
    ngOnDestroy() {
        this.modulService.isLernmodus = false;
        this.modulService.isFreiermodus = false;
        this.alleFragen = [];
        this.storageService.fragen = [];
        this.modulService.started = false;
    }

    /**
     * Method to load all imported Modules and their questions to push them to one Array.
     * This Array is used to choose ten random questions
     */
    async initialize() {
        if (this.modulService.isLernmodus) {
            if (this.authService.user.importierteModule.length) {
                this.authService.user.importierteModule.forEach(elem => {
                    this.storageService.findAllFragenLernmodus(elem.id, elem.titel)
                        .then(() => {
                            this.alleFragen.push(this.storageService.fragen);
                            this.globalCounter++;
                            if (this.globalCounter === this.authService.user.importierteModule.length) {
                                this.pushFrage();
                            }
                        });
                });
            }
        }
    }


    /**
     * Preparations for Quiz
     * Method to choose ten questions from before created array and checks if the user have a legit number of imported questions.
     */
    pushFrage() {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.alleFragen.length; i++) {
            this.sum = this.sum + this.alleFragen[i].length;
        }
        this.sum = this.sum - this.authService.user.alreadyLearned.length;

        if (this.sum < 10) {
            this.genugFragen = true;
        }

        if (this.sum >= 10) {
            this.lernmodusFragen = [];
            const alleFragenIndizes = this.alleFragen.length; // mit math.random zahl zwischen 0 und 3

            while (this.lernmodusFragen.length < 10) {
                this.correctQuestion = true;
                let counter = 0;
                const zufallsZahlModule = Math.floor(Math.random() * alleFragenIndizes);
                const anzahlFragen = this.alleFragen[zufallsZahlModule].length;
                const zufallsZahlFragen = Math.floor(Math.random() * anzahlFragen);

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.authService.user.alreadyLearned.length; i++) {
                    if (this.authService.user.alreadyLearned[i] === this.alleFragen[zufallsZahlModule][zufallsZahlFragen].id) {
                        this.correctQuestion = false;
                        break;
                    }
                }
                if (this.correctQuestion) {
                    if (this.lernmodusFragen.length === 0) {
                        this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                    } else {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < this.lernmodusFragen.length; i++) {
                            if (this.lernmodusFragen[i].id !== this.alleFragen[zufallsZahlModule][zufallsZahlFragen].id) {
                                counter++;
                                if (counter === this.lernmodusFragen.length) {
                                    this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                                }
                            }
                        }
                    }
                }
            }
            this.storageService.fragen = [];
            this.storageService.fragen = this.lernmodusFragen;
            this.lernmodusFragen = [];
            this.modulService.started = true;
        }
    }


}
