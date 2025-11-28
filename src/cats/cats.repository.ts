import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cat,  } from "./cats.schema";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Comments } from "src/comments/comments.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class CatsRepository {
    constructor(
        @InjectModel(Cat.name) private readonly catModel: Model<Cat>
    ){}
 
    async findAll(){
        const result = await this.catModel.find().populate("comments");
        return result;
    }

    async findByIdAndUpdateImg(id: string, fileName: string){
        const cat = await this.catModel.findById(id);
        if(cat){
            cat.imgUrl = `http://localhost:${process.env.PORT!}/media/${fileName}`;
            const newCat = await cat!.save();
            console.log(newCat);
            return newCat.readOnlyData;
        }else{
            throw new HttpException('업로드 되지 않았습니다.', 403);
        }
    }

    async findCatByIdWithoutPassowrd(catId: string | Types.ObjectId): Promise<Cat | null>{
        // select: 원하는 필드만 추출 ex) name id
        const cat = await this.catModel.findById(catId).select("-password");
        return cat;
    }

    async findCatByEmail(email: string): Promise<Cat | null>{
        const cat = await this.catModel.findOne({email});
        return cat;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({email});
        return result !== null;
    }

    async create(cat: CreateCatDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }
}