import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/bulkdb?replicaSet=rs0',
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