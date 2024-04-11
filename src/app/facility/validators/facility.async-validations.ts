import { AsyncValidationSuiteFactory } from "@app/shared/validation"
import { delay, of } from "rxjs";
import { Facility } from "../models/facility.model";
import { AbstractControl } from "@angular/forms";

export const facilityAsyncValidationSuite: AsyncValidationSuiteFactory<Facility> = () => {
    return {
        'name': [{
            message: 'This name is already taken.',
            fn: facilityNameValidator()
        }]
    }
}

export const facilityNameValidator = () => (c: AbstractControl) => {
    const value = c.value;

    if (value == 'Eiffel Tower') {
        return of({ nameTaken: true }).pipe(delay(1000));
    }

    return of(null).pipe(delay(1000));
}