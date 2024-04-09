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

  // HACK to find out if the field is required.
  // Angular Material  looks for an Angular required validator and draws the component label accordingly.
  // So if we discover that the field is required, "compose" with that Angular required validator
  // const testRun = suite({ [field]: null }, field, group, context).getErrors();
  // const isRequired = (testRun[field] ?? []).some(err => err.includes('is required'));
  // return isRequired ? [vestValidator, Validators.required] : vestValidator;

  const suiteValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!suite[field]) {
      return null;
    }
    const errors = suite[field].map(x => x.fn(control) == null ? null : x.message).filter(x => x != null);

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
  // console.log(`*** Creating vestAsyncValidator for field ${field}`)
  // TODO: Map the results of an async validation similar to how the sync validation works.
  // for now, async validators do not run.
  const vestAsyncValidator = (control: AbstractControl): Promise<ValidationErrors | null> => {
    const promise = new Promise<ValidationErrors | null>((resolve) => {
      if (!suite[field]) {
        resolve(null);
      }

      const obs = suite[field].map(v => toObservable(v.fn(control)).pipe(
        map(x => x == null ? null : v.message),
      ));


      combineLatest(obs).subscribe(errs => {
        const messages = errs.filter(x => x != null);

        console.log('Result',
          messages
        )

        resolve(messages.length == 0 ? null : { error: messages[0] })
      })
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