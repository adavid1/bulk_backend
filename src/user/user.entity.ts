import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {Length, IsEmail, IsDate} from "class-validator";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 25, default: null, nullable:true})
    name:string;

    @Column({nullable:true})
    email:string;

    @Column({nullable:true}) 
    password:string;

    @Column({
      default: false
    })
    administrator:boolean;

    @Column({
      default: 0
    })
    score:number;
}