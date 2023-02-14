import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

@Module({
  providers: [UsersService],
  imports: [
      TypeOrmModule.forFeature([Users]),
  ],
  exports : [UsersService]
})
export class UsersModule {}
