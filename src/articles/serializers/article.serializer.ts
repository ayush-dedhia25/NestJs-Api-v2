import { Expose } from 'class-transformer';

export class ArticleSerializer {
   @Expose()
   id: number;
   
   @Expose()
   title: string;
   
   @Expose()
   content: string;
}
