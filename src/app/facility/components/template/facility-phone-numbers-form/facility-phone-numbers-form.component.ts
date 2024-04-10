import { Component, Input } from "@angular/core";
import { FORMS, formContainerViewProvider } from "@app/shared/core";

// Arrays can have a few "gotcha" moments with template driven. This is a straightforward demonstration using just an array of strings.
// In this case, we lose the ability to do validation because the string object doesn't have any properties our ValidationSuite can map to.
//
// When handling an array of complex objects, things work just as expected with other objects. Use the
// index to access the element in the array, and the modelType to map a validation suite.
//
// This blog post covers some other gotchas: https://blog.simplified.courses/template-driven-forms-with-form-arrays/
@Component({
    selector: 'app-facility-phone-numbers-form',
    standalone: true,
    imports: [FORMS],
    template: `<div class="col" [ngModelGroup]="ngModelGroupName" [model]="vm" modelType="">
  @for (number of vm; track i; let i = $index) {
    <div class="row">
    <input-text  name="{{i}}" placeholder="Phone Number"></input-text>
  </div>
  }
  </div>
  `,
    viewProviders: [formContainerViewProvider]
  })
  export class FacilityPhoneNumbersFormComponent {
    @Input() vm?: Partial<string[]>;
    @Input('name') ngModelGroupName = "phoneNumbers";
  }