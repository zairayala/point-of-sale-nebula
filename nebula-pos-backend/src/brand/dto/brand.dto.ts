import { IsNotEmpty, IsString, Length } from "class-validator";

export class BrandDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    name: string
}