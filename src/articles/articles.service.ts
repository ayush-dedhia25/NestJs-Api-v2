import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from './models/article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticlesService {
   constructor(
      @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>
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
      const article = await this.getArticlesByTitle(articleData.title);
      if (article) {
         throw new BadRequestException('Title already exists! Please give some unique title!');
      }
      try {
         const newArticle = await this.articleRepository.create(articleData);
         return this.articleRepository.save(newArticle);
      } catch (err) {
         throw new BadRequestException(err.message);
      }
   }
   
   public async updateArticle(articleId: number, changes: Partial<ArticleEntity>) {
      const articleExists = this.findOneArticle(articleId);
      if (!articleExists) {
         throw new NotFoundException('Article not found!');
      }
      const updateQueryObject = { ...articleExists, ...changes };
      return this.articleRepository.save(updateQueryObject);
   }
   
   public async deleteArticle(articleId: number) {
      const articleToDelete = await this.findOneArticle(articleId);
      if (!articleToDelete) {
         throw new NotFoundException('Article not found!');
      }
      return this.articleRepository.remove(articleToDelete);
   }
}
