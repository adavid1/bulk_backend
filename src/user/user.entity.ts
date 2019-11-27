import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, PrimaryColumn, Unique } from 'typeorm';
import {Length, IsEmail, IsDate} from "class-validator";
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    userId: string;

    @Column({ length: 25})
    username:string;

    @Column()
    email:string;

    @Column({nullable:true})
    guest:boolean;

    @Column() 
    password:string;

    @Column({nullable:true})
    administrator:boolean;

    @Column()
    score:number;

    @JoinColumn()
    @OneToMany(type => Question, question => question.author,
                {cascade: true})
    questions: Question[];

    @JoinColumn()
    @OneToMany(type => Category, category => category.owner,
                {cascade: true})
    categories: Category[];
}