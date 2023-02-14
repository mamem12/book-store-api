import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBooksDto } from './dto/create-books.dto';
import { Books } from './entities/books.entity';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(Books)
        private booksRepository: Repository<Books>,
        @InjectRepository(Books)
        private usersRepository: Repository<Users>,
    ) {}

    async regBooks(createBooksDto: CreateBooksDto) { 
        const id = createBooksDto.user_id;
        const isSeller = await this.usersRepository.createQueryBuilder("user")
            .select()
            .where("user.id = :id", {id})
            .getOne();

        if(isSeller.category && isSeller.category == "s") {
            
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
            
        } else {

            return "fail"

        }



        return "success"

    }

    async stocks(id : number) {

    }



}
