import { Indexable } from "@app/shared/core";
import { addressValidationSuite } from "./facility-address.sync-validators";
import { facilityValidationSuite } from "./facility.validations";
import { ASYNC_VALIDATION_SUITE_FACTORIES, SYNC_VALIDATION_SUITES, ValidationSuite } from "@app/shared/validation";
import { Provider } from "@angular/core";
import { addressAsyncValidationSuite } from "./facility-address.async-validators";

export const syncValidationSuites: Indexable<ValidationSuite> = {
    facility: facilityValidationSuite,
    address: addressValidationSuite,
}

export const asyncValidationSuties: Indexable<() => ValidationSuite> = {
    address: addressAsyncValidationSuite,
}

export const validationSuiteProviders: Provider[] = [
    { provide: ASYNC_VALIDATION_SUITE_FACTORIES, useValue: asyncValidationSuties },
    { provide: SYNC_VALIDATION_SUITES, useValue: syncValidationSuites }
]
