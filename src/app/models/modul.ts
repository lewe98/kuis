
export class Modul {
    public id: string;
    public name: string;
    public titel: string;
    public anzahlFragen: number;
    public bild: string;
    public bestResult: number;
    public hinzugefuegt: string;
    public zuletztGespielt: string;
    public richtigeFragenLetztesSpiel: number;

    constructor(id: string, name: string, titel: string, bild: string) {
        this.id = id;
        this.name = name;
        this.titel = titel;
        this.bild = bild;
        this.bestResult = 0;
    }
}
