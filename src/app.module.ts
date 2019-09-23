import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { SessionModule } from './session/session.module';
import { QuestionService } from './question/question.service';
import { ChoiceService } from './choice/choice.service';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bulkDB'),
    UserModule,
    SessionModule,
    QuestionModule,
    ChoiceModule],
  controllers: [AppController, SessionController],
  providers: [AppService, SessionService, QuestionService, ChoiceService],
})
export class AppModule {}
