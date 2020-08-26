import {Statistik} from './statistik';
import {Modul} from './modul';

export class User {
    public id: string;
    public nutzername: string;
    public email: string;
    public emailBestaetigt: boolean;
    public passwort: string;
    public isOnboarded: boolean;
    public abzeichen: string[];
    public statistik: Statistik;
    public importierteModule: Modul[];
/*
    constructor(nutzername: string,
                email: string,
                passwort: string) {
        this.nutzername = nutzername;
        this.email = email;
        this.passwort = passwort;

        this.isOnboarded = false;
        this.statistik = new Statistik();
        this.emailBestaetigt = false;
        this.abzeichen = [];
        this.importierteModule = [];
    }*/
}
