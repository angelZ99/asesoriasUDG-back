import {
  IsNumberString,
  IsString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsInstitutionalEmail, IsStrongPassword } from 'src/Common';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNumberString()
  @MinLength(9)
  @ApiProperty({
    type: String,
    description: 'Institutional unique code for each user',
    minLength: 9,
    maxLength: 10,
  })
  user_code: string;

  @IsString()
  @Validate(IsInstitutionalEmail)
  @ApiProperty({
    type: String,
    description: 'Institutional unique email for each user',
    minLength: 20,
    maxLength: 50,
  })
  institutional_email: string;

  @IsString()
  @MinLength(10)
  @Validate(IsStrongPassword)
  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 10,
    maxLength: 20,
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: '---',
    minLength: 9,
    maxLength: 10,
    default: null,
  })
  nip_code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({
    description: 'First name',
    minLength: 2,
    maxLength: 30,
  })
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'First last name',
    minLength: 2,
    maxLength: 20,
  })
  surname1: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'second last name',
    minLength: 2,
    maxLength: 20,
    default: null,
  })
  surname2?: string;

  @IsString()
  @IsPhoneNumber('MX')
  @ApiProperty({
    type: String,
    description: 'Phone number linked to the account',
    minLength: 10,
    maxLength: 15,
    default: null,
  })
  phone_number: string;
}
