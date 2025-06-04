import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from './config/ormconfig';
import { BookModule } from './books/book.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './orders/order.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(DataSourceOption), BookModule,UserModule,AuthModule,OrderModule,MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
