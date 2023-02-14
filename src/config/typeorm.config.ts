import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'book_store',
  entities: [User], // Entity 연결
  synchronize: false,
};