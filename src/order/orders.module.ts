import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/books/entities/books.entity';
import { Users } from 'src/user/entities/user.entity';
import { Orders } from './entities/orders.entity';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersService],
  exports : [OrdersService],
  imports : [
    TypeOrmModule.forFeature([Orders, Books, Users]),
  ]
})
export class OrdersModule {
    
  
}
