import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { Category } from "./category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book,Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule{}