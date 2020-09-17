import {Frage} from './frage';

export class Modul {
    public id: string;
    public fragen: Frage[];
    public titel: string;
    public bild: string;
    public isImported: boolean;

    constructor(id: string, fragen: Frage[], titel: string, bild: string, isImported: boolean) {
        this.id = id;
        this.fragen = fragen;
        this.titel = titel;
        this.bild = bild;
        this.isImported = isImported;
    }
}
