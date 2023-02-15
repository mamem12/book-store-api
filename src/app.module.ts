import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { SellerModule } from './seller/seller.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './order/orders.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeORMConfig), AuthModule, SellerModule, CustomerModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
