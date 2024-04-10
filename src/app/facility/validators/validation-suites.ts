import { Indexable } from "@app/shared/core";
import { addressValidationSuite } from "./facility-address.sync-validators";
import { facilityValidationSuite } from "./facility.validations";
import { ASYNC_VALIDATION_SUITE_FACTORIES, AsyncValidationSuite, SYNC_VALIDATION_SUITES, ValidationSuite } from "@app/shared/validation";
import { Provider } from "@angular/core";
import { addressAsyncValidationSuite } from "./facility-address.async-validators";
import { facilityAsyncValidationSuite } from "./facility.async-validations";

export const syncValidationSuites: Indexable<ValidationSuite> = {
    // These are bound to the "modelName" property on components. This will bind to "facility"
    facility: facilityValidationSuite,
    // And this to "address"
    address: addressValidationSuite,
}

// It works with async validators too!
export const asyncValidationSuties: Indexable<() => AsyncValidationSuite> = {
    address: addressAsyncValidationSuite,
    facility: facilityAsyncValidationSuite
}

export const validationSuiteProviders: Provider[] = [
    { provide: ASYNC_VALIDATION_SUITE_FACTORIES, useValue: asyncValidationSuties },
    { provide: SYNC_VALIDATION_SUITES, useValue: syncValidationSuites }
]
