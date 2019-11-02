import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Choice {

    @PrimaryGeneratedColumn()
    choiceId: number;

    @Column({nullable:true})
    questionId: number;

    @Column({ length: 100, default: null, nullable:true })
    choice:string;
}