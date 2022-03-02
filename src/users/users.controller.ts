import { Controller, Get, Param, Req, Post, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from '../dtos';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserSerializer } from '../serializers';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) {}
   
   @UseGuards(JwtAuthGuard)
   @Serialize(UserSerializer)
   @Get()
   public findMe(@Req() req: Request) {
      return this.usersService.findAllUsers(req.user);
   }
   
   @Serialize(UserSerializer)
   @Get(':id')
   public findOneUser(@Param('id') id: string) {
      return this.usersService.findOneUser(parseInt(id));
   }
   
   @Serialize(UserSerializer)
   @Post('new')
   public createUser(@Body() body: CreateUserDto) {
      return this.usersService.createUser(body);
   }
}
