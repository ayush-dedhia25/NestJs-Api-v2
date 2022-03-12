import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { CommentEntity as Comment } from './comment.entity';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class CommentsService {
   constructor(
      @InjectRepository(Comment)
      private readonly commentsRepo: Repository<Comment>,
      private readonly articleService: ArticlesService
   ) {}
   
   public getAllComments() {
      return this.commentsRepo.find();
   }
   
   public getComment(commentId: number) {
      return this.commentsRepo.findOne(commentId);
   }
   
   public async addComment(comment: CreateCommentDto) {
      try {
         const newComment = await this.commentsRepo.create(comment);
         const article = await this.articleService.findOneArticle(1);
         console.log(article);
         newComment.article = article;
         return this.commentsRepo.save(newComment);
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public async fixComment(commentId: number, fix: UpdateCommentDto) {
      try {
         const prevComment = await this.getComment(commentId);
         console.log(prevComment);
         if (!prevComment) {
            throw new NotFoundException('Comment not found!');
         }
         this.commentsRepo.merge(prevComment, fix);
         return this.commentsRepo.save(prevComment);
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public async removeComment(commentId: number) {
      const commentToDelete = await this.getComment(commentId);
      if (!commentToDelete) {
         throw new NotFoundException('Comment not found!');
      }
      return this.commentsRepo.remove(commentToDelete);
   }
}
