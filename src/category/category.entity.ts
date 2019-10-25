import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum Language {
    EN,
    FR,
    GE
}

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({ length: 50, default: null, nullable:true})
    name:string;

    @Column({nullable:true})
    dateCreation:Date;

    @Column({nullable:true}) 
    owner:number;

    @Column({
      default: false
    })
    isPublic:boolean;

    @Column({
        type: "enum",
        enum: Language,
        default: Language.EN
    })
    language:Language;
}