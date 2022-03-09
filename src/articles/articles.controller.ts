import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dtos';
import { ArticleEntity } from './models/article.entity';

import { Serialize } from '../serialize.interceptor';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
   constructor(private readonly articleService: ArticlesService) {}

   @UseGuards(JwtAuthGuard)
   @Serialize(ArticleEntity)
   @Get() // Route => /articles
   public findAllArticles() {
      return this.articleService.findAllArticles();
   }

   @UseGuards(JwtAuthGuard)
   @Serialize(ArticleEntity)
   @Get(':id') // Route => /articles/:id
   public findOneArticle(@Param('id') id: string) {
      return this.articleService.findOneArticle(parseInt(id));
   }

   @Serialize(ArticleEntity)
   @Post('new') // Route => /articles/new
   public createArticle(@Body() body: CreateArticleDto) {
      return this.articleService.createArticle(body);
   }

   @UseGuards(JwtAuthGuard)
   @Serialize(ArticleEntity)
   @Patch(':id') // Route => /articles/:id
   public updateArticle(
      @Param('id') articleId: string,
      @Body() changes: UpdateArticleDto,
   ) {
      return this.articleService.updateArticle(parseInt(articleId), changes);
   }

   @UseGuards(JwtAuthGuard)
   @Serialize(ArticleEntity)
   @Delete(':id') // Route => /articles/:id
   public deleteArticle(@Param('id') articleId: string) {
      return this.articleService.deleteArticle(parseInt(articleId));
   }
}
