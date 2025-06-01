import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { OrderItem } from "./order_items.entity";
import { Cart } from "./cart.entity";
import { User } from "src/users/user.entity";
import { Book } from "src/books/book.entity";


@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo : Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepo : Repository<OrderItem>,
        @InjectRepository(Cart)
        private readonly cartRepo : Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepo : Repository<User>,
        @InjectRepository(Book)
        private readonly bookRepo : Repository<Book>
    ){}
    async addToCart(userId:number,bookId : number, quantity:number){
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) throw new Error('User not found');

        const book = await this.bookRepo.findOneBy({ id: bookId });
        if (!book) throw new Error('Book not found');
        
        const cart = this.cartRepo.create({ user, book, quantity });
        await this.cartRepo.save(cart);
        return cart;
    }

    async getCart(userId: number) {
        return await this.cartRepo.find({
            where: { user: { id: userId } },
            relations: ['book'],
        });
    }

}