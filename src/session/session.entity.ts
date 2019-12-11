import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    sessionId: number;

    @JoinColumn()
    @ManyToOne(type=>Category, category=>category.categoryId)
    category: Category;

    @JoinColumn()
    @OneToMany(type=>User, user=>user.userId)
    players: User[];

    @Column({nullable:true})
    dateCreation: Date;
}