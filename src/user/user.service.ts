import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO, CreateUserGuestDTO } from './user.dto';
import { validate } from 'class-validator';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ) {}

    //Create a user
    async addUser(dto: CreateUserDTO): Promise<User>{
        // check uniqueness of username/email
        const {username, email, guest, password, administrator, score, questions, categories} = dto;

        const user = await this.userRepository.
                    findOne({ username: username, email: email });
        if (user) {
            const errors = {username: 'Username and/or email already taken.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new user
        let newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, 10);
        if(guest==null)         newUser.guest = false;
        else                    newUser.guest = guest;
        if(administrator==null) newUser.administrator = false;
        else                    newUser.administrator = administrator;
        if(score==null)         newUser.score = 0;
        else                    newUser.score = score;
        newUser.questions = questions;
        newUser.categories = categories;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
        }
    }

    //Create a user guest
    async addUserGuest(dto: CreateUserGuestDTO): Promise<User>{
        // check uniqueness of username/email
        const {username} = dto;

        const user = await this.userRepository.
                    findOne({ username: username });
        if (user) {
            const errors = {username: 'Username already taken.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new user
        let newUser = new User();
        newUser.username = username;
        newUser.guest = true;
        newUser.administrator = false;
        newUser.score = 0;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
        }
    }

    //Get a single user by its Id
    async getUserById(userId): Promise<User>{
        const user = await this.userRepository.findOne(userId, {relations:['session','sessionHost']});
        return user;
    }

    //Get a single user by its name
    async getUserByName(username:string): Promise<User>{
        const user = await this.userRepository
                    .findOne({username: username});
        return user;
    }

    //get all users
    async getAllUser(): Promise<User[]>{
        const users = await this.userRepository.find({relations: ["questions", "categories", "session","sessionHost"]});
        return users;
    }

    //update a user
    async saveUser(id, user: UpdateUserDTO): Promise<UpdateResult> {

        const {username, email, guest,
                administrator, score, session, sessionHost} = user;

        // update user
        let updatedUser = new User();
        updatedUser.username = username;
        updatedUser.email = email;
        updatedUser.guest = guest;
        updatedUser.administrator = administrator;
        updatedUser.score = score;
        updatedUser.session = session;
        updatedUser.sessionHost = sessionHost;


        return await this.userRepository.update(id, updatedUser);
    }

    //delete a user
    async deleteUserById(userId){
        const user = await this.userRepository
                                .findOne(userId);
        this.userRepository.remove(user);
    }
}
