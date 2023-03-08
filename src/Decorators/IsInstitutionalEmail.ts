import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsInstitutionalEmail', async: false })
export class IsInstitutionalEmail implements ValidatorConstraintInterface {
  VALID_EMAIL_REGEX = new RegExp(
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{10,}@(alumnos\.udg\.mx|alumno\.udg\.mx|academicos\.udg\.mx)$/g,
  );

  validate(text: string, args: ValidationArguments) {
    return (
      this.VALID_EMAIL_REGEX.test(text) || this.VALID_EMAIL_REGEX.test(text)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `The provided email is invalid or not an institutional email!`;
  }
}
