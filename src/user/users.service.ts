import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBooksDto } from 'src/books/dto/create-books.dto';
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-users.dto';
import { Users } from "./entities/user.entity";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
      private usersRepository: Repository<Users>,
  ) {}

  async getUser(email : string, password : string) {

    const resultUser = await this.usersRepository.createQueryBuilder("user")
      .select()
      .where("user.email = :email", {email})
      .andWhere("user.password = :password", {password})
      .getRawOne();

      return resultUser;
  }

  async signUp(createUserDto : CreateUserDto) {

    const email = createUserDto.email
    const existUser = await this.usersRepository.createQueryBuilder("user")
      .select()
      .where("user.email = :email", {email})
      .getRawOne();
    
    if (existUser) {

      throw new HttpException("이미 가입한 유저입니다.", HttpStatus.CONFLICT)

    } else {

      this.usersRepository.createQueryBuilder("user")
      .insert()
      .into(Users)
      .values({
        email : createUserDto.email,
        category : createUserDto.category,
        password : createUserDto.password,
        name : createUserDto.name
      })
      .execute();

    }

    return "success";
  }

  
}
