import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    sessionId: number;

    @JoinColumn()
    @ManyToOne(type=>Category)
    category: Category;

    @JoinColumn()
    @OneToMany(type=>User, player=>player.sessions)
    players: User[];

    @JoinColumn()
    @OneToOne(type=>User)
    owner: User;

    @Column({nullable:true})
    dateCreation: Date;
}