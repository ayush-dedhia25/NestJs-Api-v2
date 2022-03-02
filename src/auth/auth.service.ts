import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, AuthDto } from '../dtos';

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
   ) {}
   
   public async signin(userData: AuthDto) {
      const [user] = await this.usersService.getUserByEmail(userData.email);
      if (!user) {
         throw new NotFoundException('User not found!');
      }
      
      try {
         if (await argon2.verify(user.password, userData.password)) {
            const jwtToken = await this.signToken(user.id, user.email);
            return { access_token: jwtToken }
         } else {
            throw new BadRequestException('Bad credentials!');
         }
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public signup(user: CreateUserDto) {
      return this.usersService.createUser(user);
   }
   
   public signToken(userId: number, email: string) {
      const payload = { sub: userId, email };
      return this.jwtService.signAsync(payload, {
         secret: 'top-secret-data',
         expiresIn: '60s',
      });
   }
}
