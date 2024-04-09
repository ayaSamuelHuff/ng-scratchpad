import { ValidationSuite } from "@app/shared/validation";
import { Validators } from "@angular/forms";

export const facilityValidationSuite: ValidationSuite = ({
    'name': [
        { fn: Validators.required, message: 'Name is required' }, 
        { fn: Validators.minLength(3), message: 'Name must be at least 3 characters'}, 
        { fn: Validators.maxLength(50), message: 'Name must be less than 50 characters.'}
    ],
})