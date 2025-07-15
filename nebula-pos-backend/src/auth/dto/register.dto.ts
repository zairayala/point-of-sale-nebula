import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsIn,
  Matches,
  Length,
} from 'class-validator'
import { Match } from '@/common/validators/match.decorator'
import { ValidateNumDoc } from '@/common/validators/validate-num-doc.decorator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(9)
  @Matches(/^\d{9}$/, { message: 'Phone must be exactly 9 digits' })
  phone: string

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

  @IsString()
  @IsIn(['superadmin','admin', 'seller'])
  role: string

  @IsOptional()
  @IsEmail()
  email?: string
}
