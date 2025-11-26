import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { ValidationPipe } from 'src/common/validation.pipe';
import { SuccessInterceptor } from 'src/common/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/readonly-cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(new HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @Get()
  getCurrentCat(){
    return 'current cat';
  }

  @ApiResponse({
    status: 500,
    description: "서버 에러"
  })
  @ApiResponse({
    status: 201,
    description: "성공",
    type: ReadOnlyCatDto
  })
  @ApiOperation({summary: '회원가입'})
  @Post()
  async signUp(@Body() body: CreateCatDto){
    return await this.catsService.signUp(body);
  }

  @ApiOperation({summary: '로그인'})
  @Post('login')
  logIn(){
    return 'login';
  }

  @ApiOperation({summary: '로그아웃'})
  @Post('logout')
  logOut(){
    return 'logout';
  }

  @ApiOperation({summary: '이미지 업로드'})
  @Post('upload')
  uploadCatImg(){
    return 'uploadImg';
  }
}