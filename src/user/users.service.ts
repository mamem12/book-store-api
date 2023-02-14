import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Users } from "./entities/user.entity";
// import { AuthenticationService } from './authentication/authentication.service';
// import { CreateUserDto } from './dto/create-user.dto';

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

  
}
