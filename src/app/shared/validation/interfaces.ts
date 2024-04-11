import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Indexable } from '@app/shared/core/utils';

export const ASYNC_VALIDATION_SUITE_FACTORIES = new InjectionToken('Async Validation Suite Factories');
export const SYNC_VALIDATION_SUITES = new InjectionToken('Synchronous Validation Suites');

export type AsyncValidator = {
  fn: AsyncValidatorFn;
  message: string;
}

export type Validator = {
  fn: ValidatorFn;
  message: string;
}

/** Creates AsyncValidationSuite */
export type AsyncValidationSuiteFactory<T extends Indexable = Indexable> = () => AsyncValidationSuite<T>;

/** Map of asynchronous validation suite factories (creators), keyed by model type. */
export interface AsyncValidationSuiteFactories extends Indexable<AsyncValidationSuiteFactory<Indexable>> {
}

/** Map of synchronous validation suites, keyed by model type. */
export interface SyncValidationSuites extends Indexable<ValidationSuite> {
}

export type ValidationSuite<T extends Indexable = Indexable> = Partial<{
  [Property in keyof T]: Validator[]
}>;

export type AsyncValidationSuite<T extends Indexable = Indexable> = Partial<{
  [Property in keyof T]: AsyncValidator[];
}>;

/** Global context with properties and services for use by validations.
 * For example, it could contain a cache of other entities to reference.
 * Each application can/should implement as needed and inject with the VALIDATION_CONTEXT injection token
 */
export interface ValidationContext extends Indexable {
}
