import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';
import { SellerController } from './seller.controller';

@Module({
  controllers: [SellerController],
  imports : [BooksModule, MulterModule.register({dest:"./images"})]
  // imports : [BooksModule, MulterModule.register()]
})

export class SellerModule {}