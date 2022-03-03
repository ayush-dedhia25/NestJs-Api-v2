import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   
   @Post('signin')
   public signin(@Body() body: AuthDto) {
      return this.authService.signin(body);
   }
   
   @Post('signup')
   public signup(@Body() body: CreateUserDto) {
      return this.authService.signup(body);
   }
}
