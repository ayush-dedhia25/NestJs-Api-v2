import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
   @IsNotEmpty({ message: 'Email cannot be skipped' })
   @IsEmail({ message: 'Email must be an email!' })
   email: string;

   @IsNotEmpty({ message: 'Password cannot be skipped' })
   @IsString({ message: 'Password must be a string' })
   password: string;
}
