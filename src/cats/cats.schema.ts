
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat {

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email',
    required: true
  })
  @Prop({
    required: true,
    unique: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({
    example: 'test',
    description: 'name',
    required: true
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: ''
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {id: string; email: string; name:string, imgUrl: string};
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// virtual 선언 > 스키마 내에서도 데코레이터를 활용하여 선언 가능
CatSchema.virtual('readOnlyData').get(function (this: HydratedDocument<Cat>) {
  return {
    id: this.id, // virtual 내에서 _id 바인딩
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  }
});