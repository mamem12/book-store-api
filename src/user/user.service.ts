import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  userList : CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    
    console.log(createUserDto)

    const user = this.userList.filter((user) => user.email === createUserDto.email)
    // 회원가입 중복처리
    if(user.length <= 0) {
      this.userList.push(createUserDto);
    } else {
      return "중복된 이메일입니다."
    }
    
    console.log(this.userList)

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
