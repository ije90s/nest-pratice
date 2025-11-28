import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentsDto } from './create-comments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from './comments.schema';
import { CatsRepository } from 'src/cats/cats.repository';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
        private readonly catsRepository: CatsRepository,
    ){}

     async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, commentData: CreateCommentsDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassowrd(id);
      const { contents, author } = commentData;
      const validatedAuthor = await this.catsRepository.findCatByIdWithoutPassowrd(author);

      if (!targetCat) {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      if (!validatedAuthor) {
        throw new NotFoundException(`Author with id ${author} not found`);
      }
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      if(comment){
        comment.likeCount += 1;
        return await comment.save();
      }
      return null;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
