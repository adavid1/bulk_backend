import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, PrimaryColumn, Unique, ManyToOne, OneToOne } from 'typeorm';
import {Length, IsEmail, IsDate} from "class-validator";
import { Question } from '../question/question.entity';
import { Category } from '../category/category.entity';
import { Session } from '../session/session.entity';
@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    userId: string;

    @Column({ length: 25})
    username:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    guest:boolean;

    @Column({nullable:true}) 
    password:string;

    @Column({nullable:true})
    administrator:boolean;

    @Column()
    score:number;

    @Column({default:"#ffffff"})
    color:string;

    @JoinColumn()
    @OneToMany(type => Question, question => question.author,
                {cascade: true})
    questions: Question[];

    @JoinColumn()
    @OneToMany(type => Category, category => category.owner,
                {cascade: true})
    categories: Category[];

    @ManyToOne(type => Session)
    session: Session;
    @ManyToOne(type => Session)
    sessionHost: Session;
}