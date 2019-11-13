import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Choice } from '../choice/choice.entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    questionId: number;

    @ManyToOne(type => Category, category => category.questions)
    category: Category;

    @ManyToOne(type => User, user => user.questions)
    author: User;

    @Column({ length: 100, default: null, nullable:true })
    question:string;

    @OneToMany(type => Choice, choice => choice.question)
    choices: Choice[];
}