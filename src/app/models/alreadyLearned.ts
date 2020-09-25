export class AlreadyLearned {
    public idQuestion: string;
    public idModul: string;

    constructor(idQuestion: string, idModul: string) {
        this.idModul = idModul;
        this.idQuestion = idQuestion;
    }
}
