import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { SessionModule } from './session/session.module';
import { QuestionService } from './question/question.service';
import { ChoiceService } from './choice/choice.service';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/bulkdb',
    {useNewUrlParser:true}),
    TypeOrmModule.forRoot(),
    UserModule,
    SessionModule,
    QuestionModule,
    ChoiceModule,
    CategoryModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }