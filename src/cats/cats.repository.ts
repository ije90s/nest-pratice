import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>){}

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({email});
        return result !== null;
    }

    async create(cat: CreateCatDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }
}