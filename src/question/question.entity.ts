import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Choice } from '../choice/choice.entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    questionId: number;

    @ManyToOne(type => Category, category => category.questions, {onDelete:"CASCADE"})
    category: Category;

    @ManyToOne(type => User, user => user.questions)
    author: User;

    @Column({ length: 100, default: null})
    question:string;

    @Column()
    hasChoices:boolean;

    @JoinColumn()
    @OneToMany(type => Choice, choice => choice.question)
    choices: Choice[];
}