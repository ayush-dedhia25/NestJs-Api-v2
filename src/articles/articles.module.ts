import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from './models/article.entity';

@Module({
   imports: [TypeOrmModule.forFeature([ArticleEntity])],
   controllers: [ArticlesController],
   providers: [ArticlesService],
})
export class ArticlesModule {}
