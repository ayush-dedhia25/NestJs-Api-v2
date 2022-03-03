import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
   @IsNotEmpty({ message: 'You must provide title for the article.' })
   @IsString({ message: 'No only numbers allowed!' })
   title: string;
   
   @IsNotEmpty({ message: 'You must provide content for this article.' })
   @IsString({ message: 'No only numbers allowed!' })
   content: string;
}
