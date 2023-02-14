import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(typeORMConfig), AuthModule, SellerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
