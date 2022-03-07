import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './models/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(UserEntity) public readonly userRepository: Repository<UserEntity>
   ) {}
   
   public findAllUsers() {
      return this.userRepository.find({ relations: ['articles'] });
   }
   
   public getUserByEmail(email: string) {
      return this.userRepository.find({ email });
   }
   
   public findOneUser(userId: number) {
      return this.userRepository.findOne(userId);
   }
   
   public async createUser(user: CreateUserDto) {
      const users = await this.getUserByEmail(user.email);
      if (users.length) {
         throw new BadRequestException('User already exists! Please signin to continue.');
      }
      try {
         const newUser = await this.userRepository.create(user);
         return this.userRepository.save(newUser);
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public async updateUser(userId: number, changes: UpdateUserDto) {
      const userExists = await this.findOneUser(userId);
      if (!userExists) {
         throw new NotFoundException('User not found!');
      }
      this.userRepository.merge(userExists, changes);
      return this.userRepository.save(userExists);
   }
   
   public async deleteUser(userId: number) {
      const userToDelete = await this.findOneUser(userId);
      if (!userToDelete) {
         throw new NotFoundException('User not found!');
      }
      return this.userRepository.remove(userToDelete);
   }
}
