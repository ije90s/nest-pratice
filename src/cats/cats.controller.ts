import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { ValidationPipe } from 'src/common/validation.pipe';
import { SuccessInterceptor } from 'src/common/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(new HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat(){
    return 'current cat';
  }

  @Post()
  signUp(){
    return 'signup';
  }

  @Post('login')
  logIn(){
    return 'login';
  }

  @Post('logout')
  logOut(){
    return 'logout';
  }

  @Post('upload')
  uploadCatImg(){
    return 'uploadImg';
  }
}