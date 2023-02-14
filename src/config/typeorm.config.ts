import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Books } from 'src/books/entities/books.entity';
import { Users } from 'src/user/entities/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'book_store',
  entities: [Users, Books], // Entity 연결
  synchronize: true,
};