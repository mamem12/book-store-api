import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CustomerModule, SellerModule]
})
export class UserModule {}
