import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, AuthDto } from '../dtos';

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
