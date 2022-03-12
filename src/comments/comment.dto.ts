import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
   @IsString({ message: 'Please pass that number as a string!' })
   @MinLength(3, { message: 'Your comment should contain more than 3 letters' })
   comment: string;
}

export class UpdateCommentDto {
   @IsString({ message: 'Please pass that number as a string!' })
   @MinLength(3, { message: 'Your comment should contain more than 3 letters' })
   comment: string;
}
