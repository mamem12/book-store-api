import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-users.dto';
import { UsersService } from 'src/user/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService : UsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("/signup")
    async signup(@Body() createUserDto : CreateUserDto) {
        return this.userService.signUp(createUserDto)
    }

}
