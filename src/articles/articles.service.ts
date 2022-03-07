import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { ArticleEntity } from './models/article.entity';
import { CreateArticleDto, UpdateArticleDto } from './dtos';

@Injectable()
export class ArticlesService {
   constructor(
      @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
      private readonly usersService: UsersService
   ) {}
   
   public findAllArticles() {
      return this.articleRepository.find();
   }
   
   public getArticlesByTitle(title: string) {
      return this.articleRepository.find({ title });
   }
   
   public findOneArticle(articleId: number) {
      return this.articleRepository.findOne(articleId);
   }
   
   public async createArticle(articleData: CreateArticleDto) {
      const articles = await this.getArticlesByTitle(articleData.title);
      console.log(articles);
      if (articles.length) {
         throw new BadRequestException('Title already exists! Please give some unique title!');
      }
      try {
         const newArticle = await this.articleRepository.create(articleData);
         const user = await this.usersService.findOneUser(1);
         newArticle.author = user;
         return this.articleRepository.save(newArticle);
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public async updateArticle(articleId: number, changes: UpdateArticleDto) {
      const articleExists = await this.findOneArticle(articleId);
      if (!articleExists) {
         throw new NotFoundException('Article not found!');
      }
      this.articleRepository.merge(articleExists, changes);
      return this.articleRepository.save({ id: articleExists.id, ...changes });
   }
   
   public async deleteArticle(articleId: number) {
      const articleToDelete = await this.findOneArticle(articleId);
      if (!articleToDelete) {
         throw new NotFoundException('Article not found!');
      }
      return this.articleRepository.remove(articleToDelete);
   }
}
