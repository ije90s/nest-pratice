import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCommentsDto } from './create-comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){}

    @ApiOperation({summary: "전체 댓글 가져오기"})
    @Get()
    async getAllComments(){
        return this.commentsService.getAllComments();
    }

    @ApiOperation({summary: "댓글 작성"})
    @Post(":id")
    async createComment(@Param("id") id: string, @Body() body: CreateCommentsDto){
        return this.commentsService.createComment(id, body);
    }

    @ApiOperation({summary: "좋아수 올리기"})
    @Patch(":id")
    async plusLike(@Param("id") id: string){
        return this.commentsService.plusLike(id);
    }
}
