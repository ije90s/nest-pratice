import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Cat } from "../cats.schema";

export class CreateCatDto extends PickType(Cat, ['email', 'password', 'name'] as const) {}
