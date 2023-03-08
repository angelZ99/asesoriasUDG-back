import { IsString, MinLength, Validate } from 'class-validator';
import { IsInstitutionalEmail } from 'src/Decorators/IsInstitutionalEmail';

export class LoginUserDto {
  @IsString()
  @Validate(IsInstitutionalEmail)
  institutional_email: string;

  @IsString()
  @MinLength(10)
  password: string;
}
