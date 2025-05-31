import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/sign_up.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    signUpDto : SignUpDto
  ): Promise<{ message: string }> {
    const user = new User();
    user.username = signUpDto.username;
    user.password = signUpDto.password;
    user.fullname = signUpDto.fullname;
    user.email = signUpDto.email;
    user.phone_number = signUpDto.phone_number;
    await this.userService.register(user);
    return {
      message: "Sign Up success !!!!"
    };
  }
}
