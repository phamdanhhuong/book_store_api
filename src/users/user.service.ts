import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepo : Repository<User>
    ){}

    async findOne(username:string):Promise<User|null>{
        return await this.userRepo.findOne({where: {username: username}});
    }

    async getUserInfo(username: string): Promise<Partial<User> | null> {
        const user = await this.userRepo.findOne({
            where: { username },
            select: ['id', 'username', 'fullname', 'email', 'phone_number', 'avatar_url'], // Không có 'password'
        });
        return user;
    }

    async register(user:User): Promise<Partial<User> | null> {
        return await this.userRepo.save(user);
    }

}