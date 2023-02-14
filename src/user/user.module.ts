import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CustomerModule, SellerModule, TypeOrmModule.forFeature([User])]
})
export class UserModule {}
