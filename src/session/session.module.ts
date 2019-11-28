import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { Session } from './session.entity';
import { SessionGateway } from './session.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session])
  ],
  providers: [SessionService, SessionGateway],
  controllers: [SessionController]
})
export class SessionModule {}
