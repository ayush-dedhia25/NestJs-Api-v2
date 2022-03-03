import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
   @IsOptional()
   userId: number;
   
   @IsString()
   name: string;
   
   @IsEmail()
   email: string;
   
   @IsString()
   password: string;
}