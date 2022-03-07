import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleEntity } from './models/article.entity';

@Module({
   imports: [UsersModule, TypeOrmModule.forFeature([ArticleEntity])],
   controllers: [ArticlesController],
   providers: [ArticlesService],
})
export class ArticlesModule {}
