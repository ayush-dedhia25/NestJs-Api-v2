import { Controller, Get, Patch, Post, Delete, Param, Body, ParseIntPipe, Header } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comments')
export class CommentsController {
   constructor(private readonly commentService: CommentsService) {}
   
   @Get() // GET /comments
   public async getAllComments() {
      return this.commentService.getAllComments();
   }
   
   @Get(':commentId') // GET /comments/:commentId
   public async getComment(@Param('commentId', ParseIntPipe) commentId: number) {
      return this.commentService.getComment(commentId);
   }
   
   @Post('new') // POST /comments/new
   @Header('Content-Type', 'application/json')
   public async createComment(@Body() comment: CreateCommentDto) {
      return this.commentService.addComment(comment);
   }
   
   @Patch(':commentId') // PATCH /comments/:commentId
   @Header('Content-Type', 'application/json')
   public async fixComment(@Param('commentId', ParseIntPipe) commentId: number, @Body() fix: UpdateCommentDto) {
      return this.commentService.fixComment(commentId, fix);
   }
   
   @Delete(':commentId') // DELETE /comments/:commentId
   public async removeComment(@Param('commentId', ParseIntPipe) commentId: number) {
      return this.commentService.removeComment(commentId);
   }
}
