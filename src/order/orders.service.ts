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

        
        if (bookAmount && bookAmount.amount < orders.amount) {
            throw new HttpException("재고 부족", HttpStatus.BAD_REQUEST)
        }

        const totalPrice = bookAmount.price * orders.amount;

        const user = await this.usersRepository.createQueryBuilder("users")
        .select()
        .where("id = :user_id", {user_id})
        .getOne()
        
        // 유저 잔고 확인
        if(user.point < totalPrice){
            throw new HttpException("잔액 부족", HttpStatus.BAD_REQUEST)
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

        return "success"
    }

    async cancel(order_id : number, user_id : number) {

        const order = await this.ordersRepository.createQueryBuilder("order")
        .select()
        .where("id = :order_id", {order_id})
        .andWhere("user_id = :user_id", {user_id})
        .getOne();
        
        if (!order) {
            throw new HttpException("유효하지 않은 거래입니다.", HttpStatus.BAD_REQUEST)
        } else if (order.stat == "C") {
            throw new HttpException("이미 취소되었습니다.", HttpStatus.BAD_REQUEST)
        }

        const book_id = order.book_id;
        
        const bookInfo = await this.booksRepository.createQueryBuilder("book")
        .select()
        .where("id = :book_id",{book_id})
        .getOne();

        const userInfo = await this.usersRepository.createQueryBuilder("user")
        .select()
        .where("id = :user_id", {user_id})
        .getOne();

        // 책 재고 반환
        const reAmount = bookInfo.amount + order.amount;

        await this.booksRepository.createQueryBuilder("book")
        .update()
        .set({"amount" : reAmount})
        .where("id = :book_id", {book_id})
        .execute();

        // 포인트 반환
        const rePoint = (bookInfo.price * order.amount) + userInfo.point;

        await this.usersRepository.createQueryBuilder("user")
        .update()
        .set({point: rePoint})
        .where("id = :user_id", {user_id})
        .execute();
        
        // 주문 취소 확정
        await this.ordersRepository.createQueryBuilder("order")
        .update()
        .set({amount : 0, stat : "C"})
        .execute();

        return "success"
    }

    async orderList(user_id : number) {

        return this.ordersRepository.createQueryBuilder("order")
        .select()
        .where("user_id = :user_id", {user_id})
        .getMany();
    }

    async orderById(user_id : number, order_id : number) {
        return this.ordersRepository.createQueryBuilder("order")
        .select()
        .where("user_id = :user_id", {user_id})
        .andWhere("id = :order_id", {order_id})
        .getOne();
    }
}
