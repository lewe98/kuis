export class User {
    public id: string;
    public nutzername: string;
    public email: string;
    public passwort: string;
    public emailBestaetigt: boolean;
    public isOnboarded: boolean;
    public abzeichen: string[];
    public gesamtzeit: number;
    public historieLernmodus: number[];
    public importierteModule: any[];
    public googleAccount: boolean;

    constructor(nutzername: string, email: string, passwort: string, googleAccount: boolean) {
        this.nutzername = nutzername;
        this.email = email;
        this.passwort = passwort;
        this.googleAccount = googleAccount;

        this.emailBestaetigt = false;
        this.isOnboarded = false;
        this.gesamtzeit = 0;
        this.historieLernmodus = [];
        this.abzeichen = [];
        this.importierteModule = [];
    }
}
