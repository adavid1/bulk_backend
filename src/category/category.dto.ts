import { Language } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import { Question } from "src/question/question.entity";

export class CategoryDTO{
    readonly categoryId: number;
    readonly name:string;
    readonly dateCreation:Date;
    readonly owner:User;
    readonly questions:Question[];
    readonly isPublic:boolean;
    readonly language:Language;
}