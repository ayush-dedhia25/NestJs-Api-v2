import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
   ) {}
   
   public findAllUsers(user: any) {
      return this.userRepository.find();
   }
   
   public getUserByEmail(email: string): Promise<UserEntity[]> {
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
}
