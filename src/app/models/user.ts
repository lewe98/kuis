import {Statistik} from './statistik';
import {Modul} from './modul';

export class User {
    public id: string;
    public nutzername: string;
    public email: string;
    public passwort: string;
    public emailBestaetigt: boolean;
    public isOnboarded: boolean;
    public abzeichen: string[];
    public statistik: Statistik;
    public importierteModule: Modul[];

    constructor(nutzername: string,
                email: string,
                passwort: string) {
        this.nutzername = nutzername;
        this.email = email;
        this.passwort = passwort;

        this.emailBestaetigt = false;
        this.isOnboarded = false;
        // this.statistik = new Statistik();
        this.abzeichen = [];
        this.importierteModule = [];
    }
}
