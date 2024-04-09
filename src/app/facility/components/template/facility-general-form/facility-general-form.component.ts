import { Component, Input } from '@angular/core';
import { Facility } from '@app/facility/models/facility.model';
import { FORMS, formContainerViewProvider } from '@app/shared/core';

@Component({
  selector: 'app-facility-general-form',
  standalone: true,
  imports: [FORMS],
  template: `<div class="row">
  <input-text name="name" placeholder="Name"></input-text>
</div>`,
  viewProviders: [formContainerViewProvider]
})
export class FacilityGeneralFormComponent {
  @Input() vm?: Partial<Facility>;
}
