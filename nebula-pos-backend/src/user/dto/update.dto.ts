import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsIn,
  Matches,
  Length,
} from 'class-validator'
import { ValidateNumDoc } from '@/common/validators/validate-num-doc.decorator'

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  @Length(9)
  @Matches(/^\d{9}$/, { message: 'Phone must be exactly 9 digits' })
  phone: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/, { message: 'Name must contain letters' })
  name: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/, { message: 'Lastname must contain letters' })
  lastname: string

  @IsString()
  @IsIn(['dni', 'passport', 'ce'])
  type_doc: string

  @IsString()
  @IsNotEmpty()
  @ValidateNumDoc()
  num_doc: string

  @IsOptional()
  @IsEmail()
  email?: string
  
  @IsString()
  @IsNotEmpty()
  user_password: string
}
