import { Component, Input, ViewChild } from '@angular/core';
import { Facility } from '@app/facility/models/facility.model';
import { FORMS } from '@app/shared/core';
import { FacilityAddressFormComponent } from '../facility-address-form/facility-address-form.component';
import { FacilityGeneralFormComponent } from '../facility-general-form/facility-general-form.component';

@Component({
  selector: 'app-facility-form',
  standalone: true,
  imports: [FORMS, FacilityAddressFormComponent, FacilityGeneralFormComponent],
  template: `<form  #form="ngForm" [model]="vm" modelType="facility">
    <app-facility-general-form [vm]="vm"></app-facility-general-form>
    <div class="row">
      <app-facility-address-form [vm]="vm?.address"></app-facility-address-form>
    </div>
  </form>`
})
export class FacilityFormComponent {  
  @Input() vm?: Partial<Facility>;
}
