import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOption } from './config/ormconfig';
import { BookModule } from './books/book.module';


@Module({
  imports: [TypeOrmModule.forRoot(DataSourceOption), BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
