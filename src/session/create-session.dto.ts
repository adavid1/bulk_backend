import { User } from "src/user/user.entity";
import { Category } from "src/category/category.entity";
import { Question } from "src/question/question.entity";
import { Choice } from "src/choice/choice.entity";

export class CreateSessionDTO{
    readonly sessionId:String;
    readonly user:User;
    readonly category:Category;
    readonly question:Question;
    readonly choice:Choice;
}