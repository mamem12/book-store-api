import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Books } from './books/entities/books.entity';
import { CustomerModule } from './customer/customer.module';
import { Orders } from './order/entities/orders.entity';
import { OrdersModule } from './order/orders.module';
import { SellerModule } from './seller/seller.module';
import { Users } from './user/entities/user.entity';
import { UsersModule } from './user/users.module';


@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users, Books, Orders], // Entity 연결
      synchronize: true,
    }), 
    AuthModule, 
    SellerModule, 
    CustomerModule, 
    OrdersModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
