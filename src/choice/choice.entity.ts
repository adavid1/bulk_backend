import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Choice {

    @PrimaryGeneratedColumn()
    choiceId: number;

    @ManyToOne(type => Question, question => question.choices)
    question: Question;

    @Column({ length: 100, default: null, nullable:true })
    choice:string;
}