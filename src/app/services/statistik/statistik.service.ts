import {Injectable} from '@angular/core';
import {Statistik} from '../../models/statistik';

@Injectable({
    providedIn: 'root'
})
export class StatistikService {

    richtigBeantwortet = 0;
    tmpArray: Statistik[] = [];
    freiermodusanzahl = [];
    freiermodusname = [];
    lernmodushistorie = [];

    constructor() {
    }

    /**
     * Method to show the result of the last game
     * @param array - the array with the questions from the last round
     * @param richtig - the number of correct answered questions in that game
     */
    printLastRound(array: Statistik[], richtig: number) {
        this.tmpArray = array;
        this.richtigBeantwortet = richtig;
    }
}
