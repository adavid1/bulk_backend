import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from './category.dto';
import { validate } from 'class-validator';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
        private categoryRepository : Repository<Category>) {}


    //Create a category
    async addCategory(dto: CategoryDTO): Promise<Category>{
        // check uniqueness of username/email
        const {name, owner, isPublic, language} = dto;
        this.categoryRepository
            .createQueryBuilder('category')
            .where('category.name = :name', { name });
        const category = await this.categoryRepository.findOne();
        if (category) {
            const errors = {name: 'name already taken.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new category
        let newCategory = new Category();
        newCategory.name = name;
        newCategory.dateCreation = new Date();
        newCategory.owner = owner;
        newCategory.isPublic = isPublic;
        newCategory.language = language;

        const errors = await validate(newCategory);
        if (errors.length > 0) {
            const _errors = {name: 'Category input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedCategory = await this.categoryRepository.save(newCategory);
            return savedCategory;
        }
    }

    //Get a single category by its ID
    async getCategoryByID(categoryID): Promise<Category>{
        const category = await this.categoryRepository
                                .findByIds(categoryID);
        return category[0];
    }

    //get all category
    async getAllCategory(): Promise<Category[]>{
        const categories = await this.categoryRepository.find();
        return categories;
    }
}
