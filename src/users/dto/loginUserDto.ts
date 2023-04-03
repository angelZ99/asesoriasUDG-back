import { IsString, MinLength, Validate } from 'class-validator';
import { IsInstitutionalEmail } from 'src/Common';

import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 10,
    maxLength: 20,
  })
  password: string;
}
