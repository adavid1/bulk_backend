import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    //Create a user
    async addUser(CreateUserDTO: CreateUserDTO): Promise<User>{
        const newUser = await this.userModel(CreateUserDTO);
        return newUser.save();
    }

    //get all user of sessions by session ID

    //Get a single user by its ID
    async getUserByID(userID): Promise<User>{
        const user = await this.userModel.findById(userID).exec();
        return user;
    }

    //get all users
    async getAllUser(): Promise<User[]>{
        const users = await this.userModel.find().exec();
        return users;
    }
}
