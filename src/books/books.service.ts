import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateBooksDto } from './dto/create-books.dto';
import { Books } from './entities/books.entity';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(Books)
        private booksRepository: Repository<Books>,
    ) {}

    async regBooks(createBooksDto: CreateBooksDto) { 

        await this.booksRepository.createQueryBuilder("books")
        .insert()
        .into(Books)
        .values({
            amount : createBooksDto.amount,
            book_name : createBooksDto.book_name,
            image : createBooksDto.image,
            price : createBooksDto.price,
            user_id : createBooksDto.user_id
        })
        .execute();

    }





}
