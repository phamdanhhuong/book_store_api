import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";


@Controller("/user")
export class UserController{
    constructor(
        private userService : UserService
    ){}

    @UseGuards(AuthGuard)
    @Get("/info")
    getUserInfo(@Request() req){
        return this.userService.getUserInfo(req.user.username);
    }
}