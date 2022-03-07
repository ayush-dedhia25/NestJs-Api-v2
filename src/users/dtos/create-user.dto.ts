import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
   @IsNotEmpty({ message: 'Name cannot be skipped!' })
   @IsString({ message: 'Name should be of string type!' })
   name: string;
   
   @IsNotEmpty({ message: 'Email cannot be skipped!' })
   @IsEmail({ message: 'email must be an email!' })
   email: string;
   
   @IsNotEmpty({ message: 'You must provide a good and strong password!' })
   @IsString({ message: 'password should be alphanumeric!' })
   password: string;
}