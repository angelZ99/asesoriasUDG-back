import {
  IsNumberString,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsInstitutionalEmail } from 'src/Decorators/IsInstitutionalEmail';

export class CreateUserDto {
  @IsString()
  @IsNumberString()
  @MinLength(9)
  user_code: string;

  @IsString()
  @Validate(IsInstitutionalEmail)
  institutional_email: string;

  @IsString()
  @MinLength(10)
  password: string;

  @IsString()
  nip_code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  surname1: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  surname2?: string;

  @IsString()
  @IsPhoneNumber('MX')
  phone_number: string;
}
