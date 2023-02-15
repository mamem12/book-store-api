import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from 'src/books/books.service';
import { Books } from 'src/books/entities/books.entity';
import { Orders } from 'src/order/entities/orders.entity';
import { OrdersService } from 'src/order/orders.service';

@Controller('customer')
export class CustomerController {
    // - 주문
    // - 주문취소
    // - 주문목록

    constructor(
        private readonly booksService : BooksService,
        private readonly ordersService : OrdersService,
    ) {}

    @Post("/order")
    @UseGuards(JwtAuthGuard)
    order(@Body() order : Orders, @Req() req) {
        
        order.user_id = req.user.userId;
        return this.ordersService.order(order);
    }
}
