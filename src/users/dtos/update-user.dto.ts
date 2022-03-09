import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
   @IsOptional()
   @IsString({ message: 'This is not a valid title' })
   name: string;

   @IsOptional()
   @IsEmail({ message: 'Email must be an email' })
   email: string;
}
