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
        this.user = this.authService.getUser();
        this.initialize();
        if (!modulService.isLernmodus && !modulService.isFreiermodus){
            if (localStorage.getItem('modus') === 'frei'){
                this.router.navigate(['moduluebersicht']);
            }else {
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
    }

    /**
     * Method to load all imported Modules and their questions to push them to one Array.
     * This Array is used to choose ten random questions
     */
    async initialize() {
        console.log('1');
        if (this.modulService.isLernmodus) {
            console.log('2');
            console.log(this.user.nutzername);
            this.modulService.findAllModuleLernmodus()
                .then(res => {
                    console.log('3');
                    this.alleModule = res;
                    if (this.user.importierteModule.length){
                    this.user.importierteModule.forEach(elem => {
                        console.log('4');
                        this.storageService.findAllFragenLernmodus(elem.id, elem.titel)
                            .then(() => {
                                console.log('5');
                                this.alleFragen.push(this.storageService.fragen);
                                this.globalCounter++;
                                if (this.globalCounter === this.user.importierteModule.length) {
                                    console.log('6');
                                    this.pushFrage();
                                }
                            });
                    });
                    }
                });
        }
    }


    /**
     * Preparations for Quiz
     * Method to choose ten questions from before created array and checks if the user have a legit number of imported questions.
     */
    pushFrage() {
        console.log('7');
        console.log(this.alleFragen);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.alleFragen.length; i++) {
            this.sum = this.sum + this.alleFragen[i].length;
            console.log('8');
        }

        this.sum = this.sum - this.user.alreadyLearned.length;

        console.log('-----------------------------');
        console.log(this.sum);
        console.log('-----------------------------');
        if (this.sum < 10) {
            console.log('toggel');
            console.log('9');
            this.genugFragen = true;
        }

        if (this.sum >= 10) {
            console.log('10');
            this.lernmodusFragen = [];
            const alleFragenIndizes = this.alleFragen.length; // mit math.random zahl zwischen 0 und 3

            while (this.lernmodusFragen.length < 10) {
                console.log('11');
                this.correctQuestion = true;
                let counter = 0;
                const zufallsZahlModule = Math.floor(Math.random() * alleFragenIndizes);
                const anzahlFragen = this.alleFragen[zufallsZahlModule].length;
                const zufallsZahlFragen = Math.floor(Math.random() * anzahlFragen);

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.user.alreadyLearned.length; i++) {
                    if (this.user.alreadyLearned[i] === this.alleFragen[zufallsZahlModule][zufallsZahlFragen].id) {
                        this.correctQuestion = false;
                        console.log('12');
                        break;
                    }
                }

                if (this.correctQuestion) {
                    console.log('13');
                    if (this.lernmodusFragen.length === 0) {
                        this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                        console.log('14');
                    } else {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < this.lernmodusFragen.length; i++) {
                            if (this.lernmodusFragen[i].id !== this.alleFragen[zufallsZahlModule][zufallsZahlFragen].id) {
                                console.log('15');
                                counter++;
                                if (counter === this.lernmodusFragen.length) {
                                    console.log('16');
                                    this.lernmodusFragen.push(this.alleFragen[zufallsZahlModule][zufallsZahlFragen]);
                                }
                            }
                        }
                    }
                }
            }

            console.log('17');
            this.storageService.fragen = [];
            this.storageService.fragen = this.lernmodusFragen;
            this.lernmodusFragen = [];
            console.log(this.storageService.fragen);
            this.modulService.started = true;
            console.log(this.modulService.started);
        }
    }


}
