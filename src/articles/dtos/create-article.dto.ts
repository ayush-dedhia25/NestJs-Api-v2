import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateArticleDto {
   // @IsNotEmpty({ message: "User id must be provided" })
   // @IsInt({ message: "Only integers allowed!" })
   // userId: number;

   @IsNotEmpty({ message: 'You must provide title for the article.' })
   @IsString({ message: 'Title should be a string!' })
   title: string;

   @IsNotEmpty({ message: 'You must provide content for this article.' })
   @IsString({ message: 'Content must be a string!' })
   content: string;
}
