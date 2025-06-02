import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { BookFilterDto } from "src/dto/book-filter.dto";

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

    async filterBooks(filter: BookFilterDto) {
        const query = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.category', 'category');

        if (filter.title) {
            query.andWhere('LOWER(book.title) LIKE LOWER(:title)', { title: `%${filter.title}%` });
        }

        if (filter.author) {
            query.andWhere('LOWER(book.author) LIKE LOWER(:author)', { author: `%${filter.author}%` });
        }

        if (filter.category_id) {
            query.andWhere('category.id = :categoryId', { categoryId: filter.category_id });
        }

        if (filter.publisher) {
            query.andWhere('LOWER(book.publisher) LIKE LOWER(:publisher)', { publisher: `%${filter.publisher}%` });
        }

        if (filter.price_min) {
            query.andWhere('book.price >= :minPrice', { minPrice: filter.price_min });
        }

        if (filter.price_max) {
            query.andWhere('book.price <= :maxPrice', { maxPrice: filter.price_max });
        }

        if (filter.pub_date_from) {
            query.andWhere('book.publication_date >= :fromDate', { fromDate: filter.pub_date_from });
        }

        if (filter.pub_date_to) {
            query.andWhere('book.publication_date <= :toDate', { toDate: filter.pub_date_to });
        }

        var books = await query.getMany()

        return books.map(({ category, ...rest }) => ({
            ...rest,
            category_id: category?.id || null,
        }));
    }

}