import {Body, Controller, Get, Post } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.entity";
import { Category } from "./category.entity";

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
    
}