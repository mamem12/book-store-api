import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from 'src/books/books.service';
import { Books } from 'src/books/entities/books.entity';
import { Orders } from 'src/order/entities/orders.entity';
import { OrdersService } from 'src/order/orders.service';

@Controller('customer')
export class CustomerController {
    // - 주문취소
    // - 주문목록
    
    constructor(
        private readonly booksService : BooksService,
        private readonly ordersService : OrdersService,
        ) {}
        
    // - 주문
    @Post("/order")
    @UseGuards(JwtAuthGuard)
    order(@Body() order : Orders, @Req() req) {
        
        order.user_id = req.user.userId;
        return this.ordersService.order(order);
    }

    @Delete("/cancel/:id")
    @UseGuards(JwtAuthGuard)
    cancel(@Param("id") order_id : number, @Req() req) {
        
        return this.ordersService.cancel(order_id, req.user.userId)
    }

    @Get("/orderlist")
    @UseGuards(JwtAuthGuard)
    orderList(@Req() req) {
        
        return this.ordersService.orderList(req.user.userId)
    }

    @Get("/orderlist/:orderId")
    @UseGuards(JwtAuthGuard)
    orderById(@Req() req, @Param("orderId") orderId : number) {
        
        return this.ordersService.orderById(req.user.userId, orderId);
    }
}
