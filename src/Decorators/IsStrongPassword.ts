import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class IsStrongPassword implements ValidatorConstraintInterface {
  VALID_PASSWORD = new RegExp(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.]{10,20}$/g,
  );

  validate(text: string, args: ValidationArguments) {
    return this.VALID_PASSWORD.test(text) || this.VALID_PASSWORD.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `The provided email is invalid or not an institutional email!`;
  }
}
