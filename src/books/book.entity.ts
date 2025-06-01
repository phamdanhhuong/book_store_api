import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("books")
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @ManyToOne(() => Category, (category) => category.books)
    @JoinColumn({name:"category_id"})
    category: Category;

    @Column()
    publisher: string;

    @Column()
    publication_date: Date;

    @Column()
    summary: string;

    @Column()
    cover_url: string;

    @Column()
    price: number;
}