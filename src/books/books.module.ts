import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';

@Module({
  providers: [BooksService],
  imports : [
    TypeOrmModule.forFeature([Books, Users]),
  ],
  exports : [BooksService]
})
export class BooksModule {}
