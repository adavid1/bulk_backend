import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Length, IsEmail, IsDate} from "class-validator";
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 25, default: null, nullable:true})
    name:string;

    @Column({nullable:true})
    email:string;

    @Column({default:true})
    guest:boolean;

    @Column({nullable:true}) 
    password:string;

    @Column({
      default: false
    })
    administrator:boolean;

    @Column({
      default: 0
    })
    score:number;

    @OneToMany(type => Question, question => question.author)
    questions: Question[];

    @OneToMany(type => Category, category => category.owner)
    categories: Category[];
}