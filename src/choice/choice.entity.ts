import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Choice {

    @PrimaryGeneratedColumn()
    choiceId: number;

    @ManyToOne(type => Question, question => question.choices, {onDelete:"CASCADE"})
    question: Question;

    @Column({ length: 100})
    choice:string;
}