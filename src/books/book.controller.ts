import { Controller, Get } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "./book.entity";

@Controller("/book")
export class BookController{
    constructor(
        private bookService: BookService
    ) {}

    @Get("/all")
    getBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

}