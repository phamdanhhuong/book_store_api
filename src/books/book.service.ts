import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookService{
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ){}

    findAll(): Promise<Book[]>{
        return this.bookRepository.find();
    }
}