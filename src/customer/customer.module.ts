import { Module } from '@nestjs/common';
import { BooksModule } from 'src/books/books.module';
import { OrdersModule } from 'src/order/orders.module';
import { CustomerController } from './customer.controller';

@Module({
  controllers: [CustomerController],
  imports : [BooksModule, OrdersModule]
})
export class CustomerModule {}
