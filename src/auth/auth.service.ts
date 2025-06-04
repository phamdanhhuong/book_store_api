import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/sign_up.dto';
import { User } from 'src/users/user.entity';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

    // Sinh OTP và thời gian hết hạn (5 phút)
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otp_expiry = dayjs().add(5, 'minute').toDate();

    await this.userService.register(user);
    await this.mailService.sendOtpEmail(user.email, otp);

    return {
      message: "Sign Up success !!!!"
    };
  }


  async verifyOtp(email: string, otp: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new Error('User not found');
    if (user.otp !== otp) throw new Error('Invalid OTP');
    if (user.otp_expiry && new Date() > user.otp_expiry) throw new Error('OTP expired');

    user.otp = null;
    user.otp_expiry = null;
    user.is_verified = true;

    await this.userRepo.save(user);
    return { message: 'Email xác nhận thành công!' };
  }


}
