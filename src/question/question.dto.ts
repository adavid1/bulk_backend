import { Category } from "../category/category.entity";
import { User } from "../user/user.entity";
import { Choice } from "../choice/choice.entity";

export class QuestionDTO{
    readonly questionId:number;
    readonly category:Category;
    readonly author:User;
    readonly question:string;
    readonly choices:Choice[];
}