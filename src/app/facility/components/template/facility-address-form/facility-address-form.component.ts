import { Component, Input } from '@angular/core';
import { FacilityAddress } from '@app/facility/models/facility-address.model';
import { UsStates } from '@app/facility/models/us-states';
import { FORMS, formContainerViewProvider } from '@app/shared/core';
import { toSelectOptions } from '@app/shared/widgets';

const states = toSelectOptions(UsStates, 'name', 'abbreviation');

@Component({
  selector: 'app-facility-address-form',
  standalone: true,
  imports: [FORMS],
  viewProviders: [formContainerViewProvider],
  template: `<div [ngModelGroup]="ngModelGroupName" [model]="vm" modelType="address">
  <div class="row">
    <input-text field="street" [group]="ngModelGroupName" placeholder="Street"></input-text>
  </div>
  <div class="row">
    <input-text field="city" [group]="ngModelGroupName" placeholder="city"></input-text>
    <input-select field="stateId" [group]="ngModelGroupName" label="State" [options]="states" placeholderOption="Select a state..."></input-select>
  </div>
  <div class="row">
    <input-text field="zip" [group]="ngModelGroupName" placeholder="ZIP Code"></input-text>
  </div>
</div>`,
})
export class FacilityAddressFormComponent {
  @Input() vm?: FacilityAddress;
  @Input('name') ngModelGroupName = "address";

  states = states;
}
