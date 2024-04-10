import { Component, Input } from '@angular/core';
import { Facility } from '@app/facility/models/facility.model';
import { FORMS, formContainerViewProvider } from '@app/shared/core';

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

@Component({
  selector: 'app-facility-general-form',
  standalone: true,
  imports: [FORMS, FacilityPhoneNumbersFormComponent],
  template: `<div class="row">
  <input-text name="name" placeholder="Name"></input-text>
</div>
<app-facility-phone-numbers-form [vm]="vm?.phoneNumbers"></app-facility-phone-numbers-form>

`,
  viewProviders: [formContainerViewProvider]
})
export class FacilityGeneralFormComponent {
  @Input() vm?: Partial<Facility>;
}

