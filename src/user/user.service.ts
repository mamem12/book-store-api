import { HttpException, Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    private authentication: AuthenticationService,
  ) {}

  async register(createUserDto: CreateUserDto) {

    try {
        const result = await this.authentication.register(createUserDto);
    } catch (error) {
        if (error instanceof HttpException) {
          return error;
        } else {
          console.error(error.stack)
        }
    }

    return 'adds a new user';
  }

  login(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }

  // async findOne(id: number) {
    
  //   return this.usersRepository.createQueryBuilder("user")
  //   .select()
  //   .where("user.id = :id", {id})
  //   .getRawOne()
  // }

}
