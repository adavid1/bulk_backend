import { Question } from "src/question/question.entity";

export class ChoiceDTO{
    readonly choiceId:number;
    readonly question:Question;
    readonly choice:string;
}