import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BooksService],
  imports : [
    TypeOrmModule.forFeature([Books])
  ],
  exports : [BooksService]
})
export class BooksModule {}
