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

    //Get a single user by its ID
    async getUserByID(userID): Promise<User>{
        const user = await this.userModel.findByName(userID).exec();
        return user;
    }
}
