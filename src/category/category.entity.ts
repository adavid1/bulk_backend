import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
import { Session } from '../session/session.entity';

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

    @JoinColumn()
    @ManyToOne(type => User, user => user.categories)
    owner: User;

    @OneToMany(type => Question, question => question.category)
    questions: Question[];

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