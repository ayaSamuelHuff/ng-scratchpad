import { Component, Input } from '@angular/core';
import { Facility } from '@app/facility/models/facility.model';
import { FORMS, formContainerViewProvider } from '@app/shared/core';
import { FacilityPhoneNumbersFormComponent } from '../facility-phone-numbers-form/facility-phone-numbers-form.component';

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

