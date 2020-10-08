import {Component, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {IonInput, ViewDidEnter} from '@ionic/angular';
import {AbzeichenService} from '../../services/abzeichen/abzeichen.service';

@Component({
    selector: 'app-hilfe',
    templateUrl: './hilfe.page.html',
    styleUrls: ['./hilfe.page.scss'],
})
export class HilfePage implements ViewDidEnter {

    @ViewChild(IonInput) search: IonInput;
    showText = false;
    filteredFragenArray = [];
    private contactForm = 'support@kuis.de';
    fragenArray = [
        {
            f: 'App benutzen?',
            a: 'Du benötigst erst einmal einen Account um die App zu nutzen! Den kannst du ganz einfach auf der Startseite unter ' +
                '"Registrieren" anlegen oder dich mit Google anmelden, falls du dort ein Konto hast!',
            show: false
        },
        {
            f: 'Passwort vergessen!',
            a: 'Keine Panik! Im Login Bereich solltest du ein "Passwort vergessen" Button vorfinden. Einfach anklicken und dann eure ' +
                'Mail eingeben. Solltet ihr euch auch an eure Mail nicht erinnern, so schreibt am besten ' + this.contactForm + ' an' +
                'mit eurem Problem!',
            show: false
        },
        {
            f: 'Wie starte ich ein Quiz?',
            a: 'Geh einfach ins Hauptmenü und klick die Fläche "Modulübersicht" an! Dort kann es dann schon losgehen ' +
                'und du kannst module einfach über den kleinen, grünen Plus-Button hinzufügen!',
            show: false
        },
        {
            f: 'Abzeichen erreichen?',
            a: 'Es ist ganz einfach! Mit Abzeichen kannst du ' +
                'dein Können und deine Erfahrung beweisen und dich mit Freunden messen! \n Um zu deinen Abzeichen zu kommen, musst du ' +
                'einfach nur zum Hauptmenü und auf die Fläche Abzeichen gehen. Dort kannst du deine bereits freigeschalteten ' +
                'Abzeichen checken und die, die dir noch fehlen. Dort siehst du auch direkt die Herausforderung um das Abzeichen zu ' +
                'erhalten! Sammel Sie alle!',
            show: false
        },
        {
            f: 'Meine Statistiken?',
            a: 'Zu den Statistiken kommst du ganz einfach über das Hauptmenü. Einfach auf die Schaltfläche Statistik drücken und du bist ' +
                'sofort da! Dort siehst du deine Statstik aufgeteilt im Freien- und im Lernmodus.',
            show: false
        },
        {
            f: 'Mein Profil?',
            a: 'Um zu deinem Profil zu kommen, musst du zum Hauptmenü. Ganz unten links siehst du die Schaltfläche "Profil" ' +
                'auf die du drücken kannst. Und schon geschafft!',
            show: false
        },
        {
            f: 'Ausloggen?',
            a: 'Um dich auszuloggen, schau einfach ganz oben rechts in der Navigationsleiste. Dort ist ein kleines Exit-Symbol ' +
                'auf welches du drücken kannst. Um die App weiter zu benutzen musst du dich allerdings neu einloggen!',
            show: false
        },
        {
            f: 'Profil löschen?',
            a: 'Wenn du dein Profil löschen möchtest, dann musst du einfach nur auf dein Profil gehen. ' +
                'Dort siehst du dann den Button "Account löschen". Aber Achtung! Einmal gelöscht kann der Nutzer nicht mehr ' +
                'wiederhergestellt werden, überleg es dir also sehr gut!',
            show: false
        },
        {
            f: 'Einen Bug entdeckt!',
            a: 'Das tut uns Leid! Wir bemühen uns, dass du ständig die beste Kuis-Erfahrung erhältst! Sollte es doch mal einen Bug geben ' +
                'dann melde dich bei ' + this.contactForm + ' und schildere dein Problem! Der Kuis-Service kümmert sich so schnell ' +
                'es geht um dein Problem!',
            show: false
        },
        {
            f: 'Frage an den Support!',
            a: 'Schau bitte hier auf der Hilfe-Page zunächst ob deine Frage nicht hier schon beantwortet werden kann. Solltest du immer ' +
                'noch eine Antwort benötigen melde dich einfach bei ' + this.contactForm + ' und schildere dein Problem! Der ' +
                'Kuis-Service kümmert sich so schnell es geht um dein Problem!',
            show: false
        },
    ];

    constructor(public authService: AuthService,
                private abzeichenService: AbzeichenService) {
        this.filteredFragenArray = this.fragenArray;
        authService.checkIfLoggedIn().then(res => {
            if (res) {
                setTimeout(() => {
                    this.abzeichenService.checkPage();
                }, 10);
            }
        });
    }

    /**
     * Takes the given String and shows the answer equivalent to the String.
     * Either shows the answer or hides it. Else the show is false.
     *
     * @param frage is the given String, in this case the Question, on which the answer should be hidden/displayed.
     */
    async showAntwort(frage: string) {
        await this.fragenArray.forEach(e => {
            if (e.f === frage) {
                e.show = !e.show;
            } else {
                e.show = false;
            }
        });
    }

    /**
     * Searches the whole Questions-array for the search-query.
     */
    async doSearch() {
        const input = await this.search.getInputElement();
        const searchValue = input.value;
        this.filteredFragenArray = this.fragenArray.filter(f => {
            return f.f.toLowerCase().includes(searchValue.toLowerCase()) ||
                f.a.toLowerCase().includes(searchValue.toLowerCase());
        });
    }

    /**
     * Clears the input for the search-query.
     */
    clear() {
        this.search.value = '';
        this.filteredFragenArray = this.fragenArray;
    }

    ionViewDidEnter() {
        setTimeout(() => this.search.setFocus(), 10);
    }
}
