import { Category } from "../category/category.entity";
import { User } from "../user/user.entity";
import { Choice } from "../choice/choice.entity";

export class CreateQuestionDTO{
    readonly category:Category;
    readonly author:User;
    readonly question:string;
    readonly choices:Choice[];
}

export class UpdateQuestionDTO{
    readonly category:Category;
    readonly question:string;
}