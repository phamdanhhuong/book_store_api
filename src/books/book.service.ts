import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class BookService{
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepo : Repository<Category>,
    ){}

    findAll(): Promise<Book[]>{
        return this.bookRepository.query("SELECT * FROM books");
    }

    async getCategories(): Promise<Category[]> {
        const result = await this.categoryRepo.find();
        return result;
    }

    async getBookByIdCategory(id:number): Promise<Book[]> {
        const result = await this.bookRepository.query("SELECT * FROM books WHERE category_id = "+id);
        return result;
    }
}