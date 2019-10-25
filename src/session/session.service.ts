import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.interface';
import { CreateSessionDTO } from './create-session.dto';

//TODO


@Injectable()
export class SessionService {
    constructor(@InjectModel('Session') private readonly sessionModel : Model<Session>) {}

    //Create a session
    async addUser(CreateSessionDTO: CreateSessionDTO): Promise<Session>{
        const newSession = await this.sessionModel(CreateSessionDTO);
        return newSession.save();
    }

    //get all user of sessions by session ID

    //Get a single session by its ID
    async getsessionByID(sessionID): Promise<Session>{
        const session = await this.sessionModel.findById(sessionID).exec();
        return session;
    }

    //get all sessions
    async getAllSession(): Promise<Session[]>{
        const sessions = await this.sessionModel.find().exec();
        return sessions;
    }
}