
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { HydratedDocument, SchemaOptions, Types } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

const options: SchemaOptions = {
    timestamps: true,
}

@Schema(options)
export class Comments {

  @ApiProperty({
    description: '고양이 ID',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "Cat"
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '내용',
    required: true
  })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ default: 0 })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: "작성 대상(게시물, 정보글)",
    required: true
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Cat',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
//CommentsSchema.set('toJSON', { virtuals: true });
//CommentsSchema.set('toObject', { virtuals: true });

