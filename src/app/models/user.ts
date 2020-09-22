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
    public historieFreiermodusName: string[];
    public historieFreiermodusAnzahl: string[];
    public importierteModule: any[];
    public googleAccount: boolean;
    public forbiddenQuestions: string[];
    public availableQuestions: any[];

    constructor(nutzername: string, email: string, passwort: string, googleAccount: boolean) {
        this.nutzername = nutzername;
        this.email = email;
        this.passwort = passwort;
        this.googleAccount = googleAccount;

        this.emailBestaetigt = false;
        this.isOnboarded = false;
        this.gesamtzeit = 0;
        this.historieLernmodus = [];
        this.historieFreiermodusName = [];
        this.historieFreiermodusAnzahl = [];
        this.abzeichen = [];
        this.importierteModule = [];
        this.availableQuestions = [];
        this.forbiddenQuestions = [];
    }
}
