import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

export class CreateSessionDTO{
    readonly category:Category;
    readonly players:User[];
}