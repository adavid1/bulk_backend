import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    sessionId: number;

    @JoinColumn()
    @OneToMany(type=>Category, category=>category.categoryId)
    categories: Category[];

    @JoinColumn()
    @OneToMany(type=>User, user=>user.userId)
    players: User[];

    @Column({nullable:true})
    dateCreation: Date;
}