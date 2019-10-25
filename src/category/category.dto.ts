import { Language } from "src/category/category.entity";
import { User } from "src/user/user.entity";

export class CategoryDTO{
    readonly categoryId: number;
    readonly name:string;
    readonly dateCreation:Date;
    readonly owner:number;
    readonly isPublic:boolean;
    readonly language:Language;
}