import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from '../entities';

@Module({
   imports: [TypeOrmModule.forFeature([UserEntity])],
   controllers: [UsersController],
   providers: [UsersService],
   exports: [UsersService]
})
export class UsersModule {}
