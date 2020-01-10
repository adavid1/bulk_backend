import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { validate } from 'class-validator';
import { User } from '../user/user.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository : Repository<Category>,
        @InjectRepository(User)
        private userRepository : Repository<User>) {}


    //Create a category
    async addCategory(dto: CreateCategoryDTO): Promise<Category>{
        // check uniqueness of username/email
        const {name, owner, isPublic, language} = dto;

        const category = await this.categoryRepository.findOne({name:name});
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
        newCategory.questions = [];

        // Update user
        if(owner){
            const userFetched = await this.userRepository.findOne(owner);;
            if(userFetched.categories==null)
                userFetched.categories = new Array();
            userFetched.categories.push(newCategory);
        }

        // update category
        const errors = await validate(newCategory);
        if (errors.length > 0) {
            const _errors = {name: 'Category input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedCategory = await this.categoryRepository.save(newCategory);
            return savedCategory;
        }
    }

    //Get a single category by its Id
    async getCategoryById(categoryId): Promise<Category>{
        const category = await this.categoryRepository
                                .findByIds(categoryId);
        return category[0];
    }

    //get all categories
    async getAllCategories(): Promise<Category[]>{
        const categories = await this.categoryRepository.find({relations: ["questions", "owner"]});
        return categories;
    }

    //get public categories
    async getPublicCategories(): Promise<Category[]>{
        let categories = await this.categoryRepository.find({relations: ["questions", "owner"]});
        categories = categories.filter(x => x.isPublic == true);
        return categories;
    }

    //update a category
    async saveCategory(id, category: UpdateCategoryDTO): Promise<UpdateResult> {
        return await this.categoryRepository.update(id, category);
    }

    //delete a category
    async deleteCategoryById(categoryId){
        const category = await this.categoryRepository
                                .findOne(categoryId);
        this.categoryRepository.remove(category);
    }

    //Get user categories
    async getCategoriesByUser(userId: number): Promise<Category[]> {
        return await this.categoryRepository.find({ relations: ["questions", "owner"], where: { owner: { userId: userId } } });
    }
}
