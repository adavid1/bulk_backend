import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { Session } from './session.entity';
import { SessionGateway } from './session.gateway';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, User]),
  ],
  providers: [SessionService,
              SessionGateway,
              UserService],
  controllers: [SessionController]
})
export class SessionModule {}
