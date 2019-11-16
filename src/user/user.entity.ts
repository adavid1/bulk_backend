import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import {Length, IsEmail, IsDate} from "class-validator";
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 25, nullable:true })
    name:string;

    @Column({nullable:true})
    email:string;

    @Column({default:true})
    guest:boolean;

    @Column({nullable:true}) 
    password:string;

    @Column({default:false})
    administrator:boolean;

    @Column({ default: 0 })
    score:number;

    @JoinColumn()
    @OneToMany(type => Question, question => question.author)
    questions: Question[];

    @OneToMany(type => Category, category => category.owner)
    categories: Category[];
}