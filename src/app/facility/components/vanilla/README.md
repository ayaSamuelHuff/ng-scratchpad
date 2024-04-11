# Vanilla Forms

These components use "vanilla" forms (none of the validation/input wrappers) to accomplish template-driven forms in Angular.

All the children "forms" bind inputs to an `ngModel` that is passed via an `Input` from the parent element. This allows deeply-nested objects to be split into many smaller forms that represent the required inputs for an individual model type.

You will note, as in the template examples, there is no `FormGroup` declared in the components. Angular implicitly generates this `FormGroup` for us from the model we provide. Our only job is to provide that model and bind to the model values in our actual form components.