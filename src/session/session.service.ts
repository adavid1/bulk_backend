import { Injectable } from '@nestjs/common';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(Session) private readonly sessionRepository : Repository<Session>) {}

    //Create a session
    async createSession(createSession: Session): Promise<Session>{
        createSession.dateCreation = new Date();
        return this.sessionRepository.save(createSession);
    }

    //get all user of sessions by session ID

    //Get a single session by its ID
    async getsessionByID(sessionID): Promise<Session>{
        const session = await this.sessionRepository.
                        findByIds(sessionID,
                                {relations: ["players" ,
                                             "categories"]})[0];
        return session;
    }

    //get all sessions
    async getAllSession(): Promise<Session[]>{
        const sessions = await this.sessionRepository.
                        find({relations: ["players", "categories"]});
        return sessions;
    }
}