import {
   Controller,
   Get,
   Post,
   Patch,
   Delete,
   Param,
   Req,
   Body,
   UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './models/user.entity';

import { Serialize } from '../serialize.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

interface IFindMe extends UserEntity {
   sub: number;
   email: string;
   iat: number;
   exp: number;
}

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @UseGuards(JwtAuthGuard)
   @Serialize(UserEntity)
   @Get() // Route => /users
   public findAllUsers() {
      return this.usersService.findAllUsers();
   }

   @UseGuards(JwtAuthGuard)
   @Serialize(UserEntity)
   @Get('me') // Route => /users/me
   public findMe(@Req() req: Request) {
      const { sub, email } = req.user as IFindMe;
      return this.usersService.findOneUser(sub);
   }

   @UseGuards(JwtAuthGuard)
   @Serialize(UserEntity)
   @Get(':id') // Route => /users/:id
   public findOneUser(@Param('id') id: string) {
      return this.usersService.findOneUser(parseInt(id));
   }

   @Serialize(UserEntity)
   @Post('new') // Route => /users/new
   public createUser(@Body() body: CreateUserDto) {
      return this.usersService.createUser(body);
   }

   @UseGuards(JwtAuthGuard)
   @Patch(':id') // Route => /users/:id
   public updateUser(
      @Param('id') userId: string,
      @Body() changes: UpdateUserDto,
   ) {
      return this.usersService.updateUser(parseInt(userId), changes);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id') // Route => /users/:id
   public deleteUser(@Param('id') userId: string) {
      return this.usersService.deleteUser(parseInt(userId));
   }
}
