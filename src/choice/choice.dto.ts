import { Question } from "../question/question.entity";

export class CreateChoiceDTO{
    readonly choiceId:number;
    readonly question:Question;
    readonly choice:string;
}

export class UpdateChoiceDTO{
    readonly choiceId:number;
    readonly question:Question;
    readonly choice:string;
}