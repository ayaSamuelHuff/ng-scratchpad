import { ValidationSuite } from "@app/shared/validation";
import { Validators } from "@angular/forms";
import { Facility } from "../models/facility.model";

// A small validation suite that checks a single property of the Facility model for validity.
// This is where [vest](https://www.npmjs.com/package/vest) was used, but this example uses native Angular validators.
// Plugging in any other validation method is pretty straightforward and just requires some changes to the error mapping in validation-fns.ts
export const facilityValidationSuite: ValidationSuite<Facility> = ({
    'name': [
        { fn: Validators.required, message: 'Name is required' },
        { fn: Validators.minLength(3), message: 'Name must be at least 3 characters' },
        { fn: Validators.maxLength(50), message: 'Name must be less than 50 characters.' }
    ],
})