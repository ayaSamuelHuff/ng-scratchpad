import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Indexable } from '@app/shared/core/utils';
import { AsyncValidationSuite, ValidationContext, ValidationSuite } from './interfaces';
import { Observable, combineLatest, from, map, merge, mergeAll, mergeMap } from 'rxjs';



/** Create Angular synchronous validator function for a single field of the model in the validation context.
 * When validation fails, the function returns a validation errors with two properties:
 * `error` - the first vest validation error,
 * `errors` - all of the vest validation errors for that field.
 * @param suite the vest suite with validation rules
 * @param field to validate
 * @param [model] the view model data to validate or a function returning such a model
 * Merges the control.value as the field property of that model.
 * @param [group] the name of a group of tests; only process tests in this group.
 * @param [context] global contextual data passed to vest validation rules.
 */
export function syncFieldValidator(
  suite: ValidationSuite,                // the validations
  field: string,                         // the property to validate
  model?: Indexable | (() => Indexable), // the view model with the data to validate
  group?: string,                        // the group of properties to validate (if specified)
  context?: ValidationContext,           // extra stuff validators could use
): ValidatorFn | ValidatorFn[] {

  // This is the magic "special sauce" that ties this whole thing together. This runs all the validators injected for this model type and field, then maps the failures back to the message defined for the failure
  // in the validation suite. If one or more validators fail, the first failure message gets set as the error and passed back to the native Angular validation code.
  const suiteValidator = (control: AbstractControl): ValidationErrors | null => {
    const validator = suite[field];

    if (!validator) {
      return null;
    }

    const errors = validator.map(x => x.fn(control) == null ? null : x.message).filter(x => x != null);

    return errors.length > 0 ? { error: errors[0] } : null;
  }

  return suiteValidator;
}

/** Create Angular asynchronous validator function for a single field of the model in the validation context
 * When validation fails, the function returns a validation errors with two properties:
 * `error` - the first vest validation error,
 * `errors` - all of the vest validation errors for that field.
 * @param suite that creates the vest suite with async validation rules.
 * @param field to validate
 * @param [model] the view model data to validate or a function returning such a model
 * Merges the control.value as the field property of that model.
 * @param [group] the name of a group of tests; only process tests in this group.
 * @param [context] global contextual data passed to vest validation rules.
 *
 * The must be a unique instance!
 *
 * Each async validator needs its own instance of the async vest suite.
 * You can only call `done()` once per suite invocation.
 * If you call `done()` twice while an async operation is flight,
 * that operation's resolution will not be caught by the later `done()`.
 * So we need to isolate suite instances.
 */
export function asyncFieldValidator(
  suite: AsyncValidationSuite,
  field: string,
  model?: Indexable | (() => Indexable),
  group?: string,
  context?: ValidationContext,
): AsyncValidatorFn {

  // Same thing here as above, this is the magic. There's just a little extra work to handle promises and observable responses.
  // This is a hacked together example and can be improved.
  const vestAsyncValidator = (control: AbstractControl): Promise<ValidationErrors | null> => {
    const promise = new Promise<ValidationErrors | null>((resolve) => {
      const validator = suite[field];

      if (!validator) {
        resolve(null);
      } else {
        const obs = validator.map(v => toObservable(v.fn(control)).pipe(
          map(x => x == null ? null : v.message),
        ));

        combineLatest(obs).subscribe(errs => {
          const messages = errs.filter(x => x != null);

          resolve(messages.length == 0 ? null : { error: messages[0] })
        });
      }


    })
    return promise;
  };
  return vestAsyncValidator;
}

const toObservable = (v: Observable<ValidationErrors | null> | Promise<ValidationErrors | null>): Observable<ValidationErrors | null> => {
  return isPromise(v) ? from(v) : v;
}

const isPromise = <T = any>(obj: any): obj is Promise<T> => {
  return !!obj && typeof obj.then === 'function';
}