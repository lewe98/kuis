
export class Modul {
    public id: string;
    public titel: string;
    public anzahlFragen: number;
    public bild: string;
    public bestResult: number;
    public hinzugefuegt: Date;
    public zuletztGespielt;
    public richtigeFragenLetztesSpiel: number;

    constructor(id: string, titel: string, bild: string) {
        this.id = id;
        this.titel = titel;
        this.bild = bild;
        this.bestResult = 0;
    }
}
