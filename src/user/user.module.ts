import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category])
  ],
  providers: [UserService, CategoryService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
