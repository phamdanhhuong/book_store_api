import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "src/auth/auth.guard";
import { AddToCartDto } from "src/dto/add_to_cart.dto";
import { PlaceOrderDto } from "src/dto/place_order.dto";

@Controller('/order')
@UseGuards(AuthGuard)
export class OrderController{
    constructor(
        private orderService : OrderService
    ){}

    @Post('/add-to-cart')
    async addToCart(@Req() req, @Body() body:AddToCartDto){
        var userId = req.user.sub
        return await this.orderService.addToCart(userId,body.bookId,body.quantity);
    }

    @Get('/get-cart')
    async getCart(@Req() req) {
        const userId = req.user.sub
        return await this.orderService.getCart(userId);
    }

    @Delete('/remove-item/:cartId')
    async removeItemFromCart(@Req() req, @Param('cartId') cartId){
        return await this.orderService.removeItemFromCart(cartId);    
    }

    @Post('/create-order')
    async createOrder(@Req() req, @Body() body:PlaceOrderDto) {
        const userId = req.user.sub;
        return await this.orderService.createOrder(body, userId);
    }

    @Get('/get-orders')
    async getOrders(@Req() req) {
        const userId = req.user.sub;
        return await this.orderService.getOrders(userId);
    }
}