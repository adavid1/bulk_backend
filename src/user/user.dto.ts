import { Question } from "../question/question.entity";
import { Category } from "../category/category.entity";

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
}

export class UpdateUserDTO{
    readonly username:string;
    readonly email:string;
    readonly guest:boolean;
    readonly administrator:boolean;
    readonly score:number;
}

export class LoginUserDTO{
    readonly username:string;
    readonly password:string;
}