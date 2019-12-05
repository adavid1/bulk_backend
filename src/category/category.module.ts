import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
