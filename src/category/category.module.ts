import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
