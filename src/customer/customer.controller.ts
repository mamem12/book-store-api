import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Orders } from 'src/order/entities/orders.entity';
import { OrdersService } from 'src/order/orders.service';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly ordersService : OrdersService,
    ) {}
        
    // - 주문
    @Post("/order")
    @UseGuards(JwtAuthGuard)
    order(@Body() order : Orders, @Req() req) {
        
        order.user_id = req.user.userId;
        return this.ordersService.order(order);
    }
    // - 주문취소
    @Delete("/cancel/:id")
    @UseGuards(JwtAuthGuard)
    cancel(@Param("id") order_id : number, @Req() req) {
        
        return this.ordersService.cancel(order_id, req.user.userId)
    }
    // - 주문목록
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
