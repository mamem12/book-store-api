import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/books/entities/books.entity';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Orders)  
        private ordersRepository: Repository<Orders>,
        @InjectRepository(Books)  
        private booksRepository: Repository<Books>,
        @InjectRepository(Users)  
        private usersRepository: Repository<Users>,
    ) {}

    async order(orders : Orders) {
        // { amount: 3, book_id: 4, user_id: '1' }
        const book_id = orders.book_id;
        const user_id = orders.user_id;
        const orderAmount = orders.amount;

        // 책 재고 확인
        const bookAmount = await this.booksRepository.createQueryBuilder("books")
        .select()
        .where("id = :book_id", {book_id})
        .getOne()
        
        if (bookAmount.amount < orders.amount) {
            return new HttpException("재고 부족", HttpStatus.FORBIDDEN)
        } else {
            console.log("재고 있음")
        }

        const totalPrice = bookAmount.price * orders.amount;

        const user = await this.usersRepository.createQueryBuilder("users")
        .select()
        .where("id = :user_id", {user_id})
        .getOne()
        
        // 유저 잔고 확인
        if(user.point < totalPrice){
            return new HttpException("잔고 부족", HttpStatus.FORBIDDEN)
        } else {
            console.log("재고 있음")
        }
        
        // 구매 책 재고 --
        const finalAmount = bookAmount.amount - orderAmount;
        this.booksRepository.createQueryBuilder("books")
        .update(Books)
        .set({amount : finalAmount})
        .where("id = :book_id", {book_id})
        .execute()

        // 유저 잔고 --
        const finalPoint = user.point - totalPrice
        this.usersRepository.createQueryBuilder("user")
        .update(Users)
        .set({point : finalPoint})
        .where("id = :user_id", {user_id})
        .execute()

        // 구매 확정
        this.ordersRepository.createQueryBuilder("order")
        .insert()
        .into(Orders)
        .values({
            book_id : book_id,
            amount : orderAmount,
            user_id : user_id,
            stat : "S"
        })
        .execute();

        return "test"
    }
}
