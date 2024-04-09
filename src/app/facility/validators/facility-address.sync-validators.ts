import { ValidationContext, ValidationSuite } from "@app/shared/validation";
import { FacilityAddress } from "../models/facility-address.model";
import { Validators } from "@angular/forms";

export const addressValidationSuite: ValidationSuite = ({
'street': [{fn: Validators.required, message: 'Required'}],
'city': [{fn: Validators.required, message: 'Required'}],
'zip': [{fn: Validators.required, message: 'Required'}]
});
