
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat {

  @Prop({
    required: true,
    unique: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {id: string; email: string; name:string};
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// virtual 선언 > 스키마 내에서도 데코레이터를 활용하여 선언 가능
CatSchema.virtual('readOnlyData').get(function (this: HydratedDocument<Cat>) {
  return {
    id: this.id, // virtual 내에서 _id 바인딩
    email: this.email,
    name: this.name,
  }
});