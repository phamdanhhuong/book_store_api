import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { In, Repository } from "typeorm";
import { OrderItem } from "./order_items.entity";
import { Cart } from "./cart.entity";
import { User } from "src/users/user.entity";
import { Book } from "src/books/book.entity";
import { PlaceOrderDto } from "src/dto/place_order.dto";


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
        
        let cartItem = await this.cartRepo.findOne({
            where: {
            user: { id: userId },
            book: { id: bookId },
            },
            relations: ['user', 'book'],
        });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = this.cartRepo.create({ user, book, quantity });
        }
        await this.cartRepo.save(cartItem);
        return cartItem;
    }

    async getCart(userId: number) {
        const cartItems = await this.cartRepo.find({
            where: { user: { id: userId } },
            relations: ['book'],
        });
        for (const item of cartItems){
            const book = await this.bookRepo.query("SELECT * FROM books WHERE id = "+item.book.id);
            if (!book) throw new Error('Book not found');
            item.book = book[0];
        }
        return cartItems;
    }

    async removeItemFromCart(cartId: number) {
        const cartItem = await this.cartRepo.findOne({ where: { id: cartId }});
        if (!cartItem) throw new Error('Cart item not found');
        try {
           return await this.cartRepo.remove(cartItem);
        } catch (error) {
            throw new Error('Failed to remove item from cart');
        }
    }

    async createOrder(placeOrder: PlaceOrderDto, userId: number) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user) throw new Error('User not found');

        var itemCarts = await this.cartRepo.find({
            where: { id: In(placeOrder.itemIds)},
            relations: ['book'],
        });

        if (itemCarts.length === 0) {
            throw new Error('No items in cart');
        }
        if (itemCarts.length !== placeOrder.itemIds.length) {
            throw new Error('Some cart items are invalid or not found');
        }

        var order = new Order();
        order.shipping_address = placeOrder.address;
        order.payment_method = placeOrder.payment_method;
        order.user = user;

        var totalPrice = 0;
        var orderItems: OrderItem[] = [];
        for (const item of itemCarts){
            var orderItem = new OrderItem();
            orderItem.book = item.book;
            orderItem.quantity = item.quantity;
            orderItem.price = item.book.price;
            orderItem.order = order;
            orderItems.push(orderItem);

            totalPrice += item.book.price * item.quantity;
        }

        order.items = orderItems;
        order.total_price = totalPrice;

        await this.orderRepo.save(order);
        await this.orderItemRepo.save(orderItems);
        await this.cartRepo.remove(itemCarts);

        const { user:_, ...rest } = order;
        var restOrder = {
            ...rest,
            items: order.items.map(({ order, ...rest }) => rest)
        };

        return restOrder;
    }
    async getOrders(userId: number) {
        const orders = await this.orderRepo.find({
            where: { user: { id: userId } },
            relations: ['items', 'items.book'],
        });
        return orders;
    }
        
}