import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASS');
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,        
        pass: pass,       
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    const info = await this.transporter.sendMail({
      from: `"Book Store" <${this.configService.get<string>('MAIL_USER')}>`,
      to,
      subject: 'Xác thực email - Book Store',
      text: `Mã OTP của bạn là: ${otp}`,
      html: `<h3>Mã OTP của bạn là: <b>${otp}</b></h3><p>OTP này có hiệu lực trong 5 phút.</p>`,
    });

    console.log('OTP sent: %s', info.messageId);
  }
}
