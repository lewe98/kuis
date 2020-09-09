export class Abzeichen {
    constructor(id: string, titel: string, beschreibung: string) {
        this.id = id;
        this.titel = titel;
        this.beschreibung = beschreibung;
        this.showBeschreibung = false;
        this.erreicht = false;
    }
    public id: string;
    public titel: string;
    public beschreibung: string;
    public showBeschreibung = false;
    public erreicht = false;
}
