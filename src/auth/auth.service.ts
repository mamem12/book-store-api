import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email, password);
        
        if (user) {
          return user;
        }

        return null;
    }

    async login(user: any) {
      const payload = { userId: user.user_id, user_email: user.user_email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

}
