export class Statistik {
    set showBeschreibung(value: boolean) {
        this._showBeschreibung = value;
    }

    set frage(value: string) {
        this._frage = value;
    }

    set gewaehlteAntwort(value: string) {
        this._gewaehlteAntwort = value;
    }

    set richtigeAntwort(value: string) {
        this._richtigeAntwort = value;
    }

    public _frage: string;
    public _gewaehlteAntwort: string;
    public _richtigeAntwort: string;
    public _showBeschreibung: boolean;

}
