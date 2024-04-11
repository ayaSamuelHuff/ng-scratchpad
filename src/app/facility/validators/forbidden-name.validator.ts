import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export const forbiddenNameValidator = (): ValidatorFn => (control: AbstractControl) => {
    if (!control.value) {
        return null;
    }

    const value: string = control.value;  
    
    return value.toLowerCase() === 'elmo' ? { forbiddenName: 'elmo' } : null;
}

@Directive({
    selector: '[forbiddenName]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:ForbiddenNameValidatorDirective,
        multi: true,
    }],
    standalone: true,
})
export class ForbiddenNameValidatorDirective implements Validator {
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return forbiddenNameValidator()(control);
    }
}