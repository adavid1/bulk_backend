import { Question } from "../question/question.entity";
import { Category } from "../category/category.entity";

export class CreateUserDTO{
    readonly userId: number;
    readonly name:string;
    readonly email:string;
    readonly guest:boolean;
    readonly password:string;
    readonly administrator:boolean;
    readonly score:number;
    readonly questions: Question[];
    readonly categories: Category[];
}