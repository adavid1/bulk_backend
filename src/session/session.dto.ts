import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

export class CreateSessionDTO{
    readonly sessionId:String;
    readonly categories:Category[];
    readonly users:User[];
    readonly dateCreation:Date;
}