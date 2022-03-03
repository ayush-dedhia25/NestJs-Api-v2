import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
   ) {}
   
   public findAllUsers() {
      return this.userRepository.find();
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
   
   public async updateUser(userId: number, changes: Partial<UserEntity>) {
      const userExists = await this.findOneUser(userId);
      if (!userExists) {
         throw new NotFoundException('User not found!');
      }
      return this.userRepository.save({ id: userExists.id, ...changes });
   }
   
   public async deleteUser(userId: number) {
      const userToDelete = await this.findOneUser(userId);
      if (!userToDelete) {
         throw new NotFoundException('User not found!');
      }
      return this.userRepository.remove(userToDelete);
   }
}
