export class Abzeichen {
    public id: string;
    public titel: string;
    public beschreibung: string;
    public showBeschreibung = false;
    public erreicht = false;
    public index: number;

    constructor(id: string, titel: string, beschreibung: string, index: number) {
        this.id = id;
        this.titel = titel;
        this.beschreibung = beschreibung;
        this.showBeschreibung = false;
        this.erreicht = false;
        this.index = index;
    }
}
