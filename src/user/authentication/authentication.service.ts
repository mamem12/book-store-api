import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { IAuthenticationService } from "./IAuthenticationService";

@Injectable()
export class AuthenticationService implements IAuthenticationService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}


    async register(createUserDto: CreateUserDto) {

        try {
            
            const email = createUserDto.email
    
            const existUser = await this.usersRepository.createQueryBuilder("user")
            .select()
            .where("user.email = :email", {email})
            .getRawOne()
    
            // 회원가입 중복처리
            if(existUser) {
                throw new HttpException("중복된 이메일 입니다.", HttpStatus.BAD_REQUEST);
            } else {
                this.usersRepository.createQueryBuilder("user")
                .insert()
                .into(User)
                .values([createUserDto])
                .execute()
                ;
            }
            
        } catch (error) {
            throw error;    
        }

        return true;
    }

    getAuthenticatedUser(email: string, password: string): Function {

        

        throw new Error("Method not implemented.");
    }

    // constructor(private readonly usersService: UsersService) {}
    // public async register(registrationData: RegisterDto) {
        // const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        // try {
        //   const createdUser = await this.usersService.create({
        //     ...registrationData,
        //     password: hashedPassword,
        //   });
        //   createdUser.password = undefined;
          
        //   return createdUser;
        // } catch (error) {
        //   if (error?.code === PostgresErrorCode.UniqueViolation) {
        //     throw new HttpException(
        //       '사용자 이메일은 이미 존재합니다.',
        //       HttpStatus.BAD_REQUEST,
        //     );
        //   }
        //   throw new HttpException(
        //     '알 수 없는 오류가 발생했습니다.',
        //     HttpStatus.INTERNAL_SERVER_ERROR,
        //   );
        // }
        // }
    // }

    // public async getAuthenticatedUser(email: string, hashedPassword: string) {
    //     try {
    //       const user = await this.usersService.getByEmail(email);
    //       const isPasswordMatching = await bcrypt.compare(
    //         hashedPassword,
    //         user.password,
    //       );
    //       if (!isPasswordMatching) {
    //         throw new HttpException(
    //           '잘못된 인증 정보입니다.',
    //           HttpStatus.BAD_REQUEST,
    //         );
    //       }
    //       user.password = undefined;
    
    //       return user;
    //     } catch (error) {
    //       throw new HttpException(
    //         '잘못된 인증 정보입니다.',
    //         HttpStatus.BAD_REQUEST,
    //       );
    //     }
    //   }

}