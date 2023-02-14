import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { typeORMConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    // constructor(private dataSource: DataSource) {}
}
