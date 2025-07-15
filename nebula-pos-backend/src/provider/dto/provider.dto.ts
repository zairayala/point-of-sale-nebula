import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";

export class ProviderDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    name: string

    @IsString()
    @IsOptional()
    @Min(3)
    ruc?: string

    @IsString()
    @IsOptional()
    @Min(7)
    phone?: string

    @IsEmail()
    @IsOptional()
    @Min(7)
    email?: string

    @IsString()
    @IsOptional()
    @Length(3, 20)
    address?: string
}