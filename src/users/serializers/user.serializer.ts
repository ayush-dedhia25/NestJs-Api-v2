import { Expose } from 'class-transformer';
import { ArticleEntity } from '../../articles/models/article.entity'

export class UserSerializer {
   @Expose() id: number;
   @Expose() name: string;
   @Expose() email: string;
   @Expose() articles: ArticleEntity[];
}
