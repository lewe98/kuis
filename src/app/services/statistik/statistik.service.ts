import { Injectable } from '@angular/core';
import {Statistik} from '../../models/statistik';

@Injectable({
  providedIn: 'root'
})
export class StatistikService {

  richtigBeantwortet = 0;
  tmpArray: Statistik[] = [];

  constructor() { }

  printLastRound(array: Statistik[], richtig: number){
    this.tmpArray = array;
    this.richtigBeantwortet = richtig;
  }
}
