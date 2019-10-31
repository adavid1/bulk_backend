import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    questionId: number;

    @Column({nullable:true})
    categoryId: number;

    @Column({nullable:true})
    author: number;

    @Column({ length: 100, default: null, nullable:true })
    question:string;
}