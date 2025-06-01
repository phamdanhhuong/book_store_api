import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { OrderItem } from "./order_items.entity";
import { Order } from "./order.entity";
import { User } from "src/users/user.entity";
import { Book } from "src/books/book.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Cart,OrderItem,Order,User,Book])],
    controllers:[OrderController],
    providers:[OrderService]
})
export class OrderModule{}