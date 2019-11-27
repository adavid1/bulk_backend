import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { Session } from './session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session])
  ],
  providers: [SessionService],
  controllers: [SessionController]
})
export class SessionModule {}
