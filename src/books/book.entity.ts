import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    category: string;

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