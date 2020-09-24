import { Injectable } from '@angular/core';
import {Statistik} from '../../models/statistik';

@Injectable({
  providedIn: 'root'
})
export class StatistikService {

  tmpArray: Statistik[] = [];

  constructor() { }

  printLastRound(array: Statistik[]){
    this.tmpArray = array;
  }
}
