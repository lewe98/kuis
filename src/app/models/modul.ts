import {Frage} from './frage';

export class Modul {
    public id: string;
    public titel: string;
    public anzahlFragen: number;
    public bild: string;
    public richtigeFragenLetztesSpiel: number;
    public hinzugefuegt: Date;
    public zuletztGespielt;

    constructor(id: string, titel: string, bild: string) {
        this.id = id;
        this.titel = titel;
        this.bild = bild;
    }
}
