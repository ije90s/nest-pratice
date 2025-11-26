import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatsRepository){}
  
  async signUp(body: CreateCatDto){
    const { email, name, password } = body;
    const isCatExist = await this.catRepository.existsByEmail(email);

    if(isCatExist){
      throw new UnauthorizedException('해당되는 고양이는 이미 존재합니다.');
      //throw new HttpException('해당되는 고양이는 이미 존재합니다.', 403);
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catRepository.create({
      email,
      name,
      password: hashedPassword
    });

    return cat.readOnlyData;
  }
}
