import { Injectable } from '@angular/core';
import {Statistik} from '../../models/statistik';

@Injectable({
  providedIn: 'root'
})
export class StatistikService {

  richtigBeantwortet = 0;
  tmpArray: Statistik[] = [];

  constructor() { }

  /**
   * Prepair to show the result of the last game
   * @param array - get the array with the questions from the last round
   * @param richtig - get the number of correct answered questions
   */
  printLastRound(array: Statistik[], richtig: number){
    this.tmpArray = array;
    this.richtigBeantwortet = richtig;
  }
}
