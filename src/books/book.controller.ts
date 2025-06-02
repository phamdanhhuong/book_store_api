import {Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.entity";
import { Category } from "./category.entity";
import { BookFilterDto } from "src/dto/book-filter.dto";

@Controller("/book")
export class BookController{
    constructor(
        private bookService: BookService
    ) {}

    @Get("/all")
    getBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get("/categories")
    getCategories(): Promise<Category[]> {
        return this.bookService.getCategories();
    }

    @Post("/categories")
    async getBookByIdCategory(@Body() body : { categoryId: number }): Promise<Book[]>{
        const categoryId = body.categoryId;
        return this.bookService.getBookByIdCategory(categoryId);
    }

    @Get('filter')
    async filterBooks(@Query() filterDto: BookFilterDto) {
        return await this.bookService.filterBooks(filterDto);
    }
    
}