import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user.service";
import { catchError, map, Observable, of } from "rxjs";

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }
    return userService.checkEmailExists(control.value).pipe(
      map(exists => (exists ? { emailExists: true } :null)),
      catchError(() => of(null))
    );
  };
}

export function uniqueEmailExceptSelf(
  userService: UserService,
  originalEmail: string
): AsyncValidatorFn {
  const baseValidator = emailExistsValidator(userService);

  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const value = (control.value ?? '').toString().trim().toLowerCase();

    if (!value) return of(null);
    if (originalEmail && value === originalEmail.trim().toLowerCase()) return of(null);

    return baseValidator(control);
  };
}