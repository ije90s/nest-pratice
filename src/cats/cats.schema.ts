
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions, Types } from 'mongoose';
import { ref } from 'process';
import { Comments } from 'src/comments/comments.schema';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Cat {

  _id: Types.ObjectId;

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

  @Prop({ default: '' })
  @IsString()
  imgUrl: string;

  // getter만 가능
  @Virtual({
    get: function (this: Cat) {
      return {
        id: this._id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl,
        comments: this.comments,
      }
    },
  })
  readonly readOnlyData: {id: string; email: string; name:string, imgUrl: string, comments: Comments[]};

  readonly comments: Comments[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// virtual 선언 > 스키마 내에서도 데코레이터를 활용하여 선언 가능
// _CatSchema.virtual('readOnlyData').get(function (this: HydratedDocument<Cat>) {
//   return {
//     id: this.id, // virtual 내에서 _id 바인딩
//     email: this.email,
//     name: this.name,
//     imgUrl: this.imgUrl,
//     comments: this.comments
//   }
// });
// comments
CatSchema.virtual('comments', { //첫번째 필드값은 조인해서 쓰이는 칼럼명
  ref: 'Comments',     //컬렉션명
  localField: '_id',
  foreignField: 'info'
});
CatSchema.set('toObject', { virtuals: true});
CatSchema.set('toJSON', {virtuals: true});

//export const CatSchema = _CatSchema;

export type CatWithComments = HydratedDocument<Cat> & {
  comments: Comments[];
};