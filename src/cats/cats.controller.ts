import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { ValidationPipe } from 'src/common/validation.pipe';
import { SuccessInterceptor } from 'src/common/success.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/readonly-cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/common/user.decorator';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(new HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({summary: '현재 고양이 가져오기'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@User() cat){
    return cat.readOnlyData;
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
  logIn(@Body() data: LoginAuthDto){
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({summary: '이미지 업로드'})
  @Post('upload')
  uploadCatImg(){
    return 'uploadImg';
  }
}