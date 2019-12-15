import { Language } from "src/category/category.entity";
import { User } from "src/user/user.entity";
import { Question } from "src/question/question.entity";

export class CreateCategoryDTO{
    readonly name:string;
    readonly owner:User;
    readonly isPublic:boolean;
    readonly language:Language;
}

export class UpdateCategoryDTO{
    readonly categoryId: number;
    readonly name:string;
    readonly dateCreation:Date;
    readonly owner:User;
    readonly isPublic:boolean;
    readonly language:Language;
}