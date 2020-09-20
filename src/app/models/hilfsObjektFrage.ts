export class HilfsObjektFrage {
    public id: string;
    public counter: number;
    public idModul: string;

    constructor(id: string, idModul: string) {
        this.idModul = idModul;
        this.id = id;
        this.counter = 0;
    }
}
