# Vanilla Forms

These components use "vanilla" forms (none of the validation/input wrappers) to accomplish template-driven forms in Angular.

All the children "forms" bind inputs to an `ngModel` that is passed via an `Input` from the parent element. This allows deeply-nested objects to be split into many smaller forms that represent the required inputs for an individual model type.

You will note, as in the template examples, there is no `FormGroup` declared in the components. Angular creates a `FormGroup` behind the scenes that we bind to our UI. At first glance, this seems bad. Normally I'd agree that string-coupling is dangerous but we do the same thing with reactive forms when calling `patch` or when using the value of the form. If we have to do it regardless, why not do it in a way that uses less code and less layers?