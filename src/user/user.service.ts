import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const email = createUserDto.email

    const existUser = await this.usersRepository.createQueryBuilder("user")
    .select()
    .where("user.email = :email", {email})
    .getRawOne()

    // 회원가입 중복처리
    if(existUser) {
      return "중복된 이메일입니다."
    } else {
      this.usersRepository.createQueryBuilder("user")
      .insert()
      .into(User)
      .values([createUserDto])
      .execute()
      ;
    }
    
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    
    return this.usersRepository.createQueryBuilder("user")
    .select()
    .where("user.id = :id", {id})
    .getRawOne()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
