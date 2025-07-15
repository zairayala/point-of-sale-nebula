import { Match } from "@/common/validators/match.decorator"
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator"

export class PasswordUserDto {
      @IsString()
      @IsOptional()
      previous_password? : string
    
      @IsString()
      @IsNotEmpty()
      @Length(8)
      @Matches(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
      @Matches(/\d/, { message: 'Password must contain at least one number' })
      @Matches(/^\S*$/, { message: 'Password must not contain spaces' })
      password: string
    
      @IsString()
      @IsNotEmpty()
      @Match('password')
      password_confirmation: string
}