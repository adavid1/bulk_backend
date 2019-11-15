import { Question } from "../question/question.entity";

export class ChoiceDTO{
    readonly choiceId:number;
    readonly question:Question;
    readonly choice:string;
}