import { AsyncValidationSuiteFactory } from "@app/shared/validation"
import { delay, of } from "rxjs";

export const facilityAsyncValidationSuite: AsyncValidationSuiteFactory = () => {
    return {
        'name': [{
            message: 'This name is already taken.', 
            fn: (c) => {
                const value = c.value;

                // Example: This would call out to a service to check and see if the value is already taken

                if (value == 'Eiffel Tower') {
                    return of({nameTaken: true}).pipe(delay(1000));
                }

                return of(null).pipe(delay(1000))
            }
        }]
    }
}