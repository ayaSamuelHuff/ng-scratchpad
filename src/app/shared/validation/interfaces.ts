import { InjectionToken } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Indexable } from '@app/shared/core/utils';

export const ASYNC_VALIDATION_SUITE_FACTORIES = new InjectionToken('Async Validation Suite Factories');
export const SYNC_VALIDATION_SUITES = new InjectionToken('Synchronous Validation Suites');

export type Validator = {
  fn: ValidatorFn;
  message: string;
}

/** Creates AsyncValidationSuite */
export type AsyncValidationSuiteFactory = () => ValidationSuite;

/** Map of asynchronous vest validation suite factories (creators), keyed by model type. */
export interface AsyncValidationSuiteFactories extends Indexable<AsyncValidationSuiteFactory> {
}

/** Map of synchronous vest validation suites, keyed by model type. */
export interface SyncValidationSuites extends Indexable<ValidationSuite> {
}

/** A vest sync or async validation suite, shaped for this validation implementation. */
export type ValidationSuite = {
  [name: string]: Validator[]
} 

/** Vest validation suite function. Pass to vest `create()` to make a vest suite. */
export type ValidationSuiteFn = (
  model: Indexable,
  field?: string,
  group?: string,
  vc?: ValidationContext
) => void;

/** Global context with properties and services for use by validations.
 * For example, it could contain a cache of other entities to reference.
 * Each application can/should implement as needed and inject with the VALIDATION_CONTEXT injection token
 */
export interface ValidationContext extends Indexable {
}
