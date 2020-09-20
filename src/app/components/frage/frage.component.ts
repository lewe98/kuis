import {Component} from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Frage} from '../../models/frage';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth/auth.service';
import {ModulService} from '../../services/modul/modul.service';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-frage',
    templateUrl: './frage.component.html',
    styleUrls: ['./frage.component.scss'],
})
export class FrageComponent {

    f = new Frage();
    bild = '';
    counter = 0;
    richtigBeantwortetLernmodusCounter = 0;
    // TODO: - Fortschritt Freier Modus (Modulübersicht)
    richtigBeantwortetFreiermodusCounter = 0;
    user: User;
    timer = 0;
    interval;
    correctIds = [];
    wrongIds = [];

    constructor(public storageService: StorageService,
                public modulService: ModulService,
                private authService: AuthService,
                private toastService: ToastService,
                private router: Router) {
        this.initialize();
        this.user = this.authService.getUser();
        // TODO nur wenn im Lernmodus
        if (this.modulService.isLernmodus) {
            this.startTimer();
        }
    }

    /**
     * Method to increment the timer every second.
     */
    startTimer() {
        this.interval = setInterval(() => {
            this.timer++;
        }, 1000);
    }

    /**
     * Method to pause the incrementation of the timer.
     */
    pauseTimer() {
        clearInterval(this.interval);
    }

    /**
     * Method to show the next question, if the quiz is not finished yet.
     */
    showNextQuestion() {
        this.counter++;
        if (this.counter === this.storageService.fragen.length) {
            if (this.modulService.isLernmodus) {
                this.pauseTimer();
                this.user.historieLernmodus.push(this.richtigBeantwortetLernmodusCounter);
                this.user.gesamtzeit = this.user.gesamtzeit + this.timer;
                this.modulService.isLernmodus = false;
                this.swapQuestionsToForbidden();
                this.inkrementQuestionsCounterFromUser();
                this.authService.updateProfile(this.user);
                this.router.navigate(['/statistik']);
            } else {
                this.toastService.presentToast('Das Modul wurde abgeschlossen.');
                this.router.navigate(['/moduluebersicht']);
                // TODO: - Fortschritt Freier Modus (Modulübersicht)
                // this.authService.updateProfile(this.user);
            }
        } else {
            this.initialize();
        }
    }

    /**
     * Method to overwrite the current question with the values of the upcoming question.
     */
    async initialize() {
        this.f.id = this.storageService.fragen[this.counter].id;
        this.f.frage = this.storageService.fragen[this.counter].frage;
        this.f.antworten = this.storageService.fragen[this.counter].antworten;
        this.shuffleAntworten(this.f.antworten);
        this.f.richtigeAntwort = this.storageService.fragen[this.counter].richtigeAntwort;
        this.f.bild = this.storageService.fragen[this.counter].bild;

        await this.storageService.getPicture(this.f.bild)
            .then((url) => {
                this.bild = url;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Method to shuffle the array containing the answers.
     * @param array array that will be shuffled.
     */
    shuffleAntworten(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    /**
     * Method to submit the answer and receive feedback.
     * @param gewaehlteAntwort answer that the user has chosen.
     */
    submitAnswer(gewaehlteAntwort: string) {
        if (this.f.richtigeAntwort === gewaehlteAntwort) {
            // TODO: - Style (grün, Konfetti)
            alert('richtig :)');
            if (this.modulService.isLernmodus) {
                this.correctIds.push(this.f.id);
                this.richtigBeantwortetLernmodusCounter++;
            } else {
                // TODO: - Fortschritt Freier Modus (Modulübersicht)
                this.richtigBeantwortetFreiermodusCounter++;
            }
            setTimeout(() => {
                this.showNextQuestion();
            }, 1000);
        } else {
            // TODO: - Style (rot, Wackeln)
            alert('falsch :(');
            if (this.modulService.isLernmodus){
             this.wrongIds.push(this.f.id);
            }
            setTimeout(() => {
                this.showNextQuestion();
            }, 1000);
        }
    }


    /**
     * Checks the Array one Time at the End of the Game
     */
    swapQuestionsToForbidden(){
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.wrongIds.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < this.user.availableQuestions.length; j++) {
                if (this.wrongIds[i] === this.user.availableQuestions[j].id){
                    this.user.availableQuestions[j].counter = 0;
                }
            }
        }
    }

    inkrementQuestionsCounterFromUser(){
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.correctIds.length; i++) {
            for (let j = 0; j < this.user.availableQuestions.length; j++) {
                if (this.correctIds[i] === this.user.availableQuestions[j].id){
                    this.user.availableQuestions[j].counter +=  1;
                    if (this.user.availableQuestions[j].counter === 6){
                            this.user.forbiddenQuestions.push(this.user.availableQuestions[j].id);
                            this.user.availableQuestions.splice(j, 1);
                        }
                }
            }
        }

    }
}
