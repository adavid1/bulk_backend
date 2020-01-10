import { Question } from "../question/question.entity";
import { Category } from "../category/category.entity";
import { Session } from "../session/session.entity";

export class CreateUserDTO{
    readonly username:string;
    readonly email:string;
    readonly guest:boolean;
    readonly password:string;
    readonly administrator:boolean;
    readonly score:number;
    readonly questions: Question[];
    readonly categories: Category[];
}
export class CreateUserGuestDTO{
    readonly username:string;
    readonly color:string;
}

export class UpdateUserDTO{
    readonly username:string;
    readonly email:string;
    readonly guest:boolean;
    readonly administrator:boolean;
    readonly score:number;
    readonly color:string;
    readonly session:Session;
    readonly sessionHost:Session;
}

export class LoginUserDTO{
    readonly username:string;
    readonly password:string;
}