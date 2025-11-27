import { PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class CreateCatDto extends PickType(Cat, ['email', 'password', 'name'] as const) {}
