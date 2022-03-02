import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
   @IsNotEmpty({})
   @IsEmail({})
   email: string;
   
   @IsNotEmpty({})
   @IsString({})
   password: string;
}
