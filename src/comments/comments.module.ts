import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesModule } from '../articles/articles.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from './comment.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([CommentEntity]),
      ArticlesModule
   ],
   controllers: [CommentsController],
   providers: [CommentsService]
})
export class CommentsModule {}
