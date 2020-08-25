import {Statistik} from './statistik';
import {Modul} from './modul';

export class User {
    public id: string;
    public nutzername: string;
    public email: string;
    public passwort: string;
    public abzeichen: string[];
    public statistik: Statistik;
    public isOnboarded: boolean;
    public importierteModule: Modul[];
}
