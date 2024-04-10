import { Component, Input, ViewChild } from '@angular/core';
import { FacilityAddressFormComponent } from '../facility-address-form/facility-address-form.component';
import { FacilityGeneralFormComponent } from '../facility-general-form/facility-general-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Facility } from '@app/facility/models/facility.model';

@Component({
  selector: 'app-facility-vanilla-form',
  standalone: true,
  imports: [
    FacilityAddressFormComponent,
    FacilityGeneralFormComponent,
    FormsModule
  ],
  template: `<form #facilityForm="ngForm">
    <app-facility-general-form [vm]="vm"></app-facility-general-form>
    <app-facility-address-form [vm]="vm.address"></app-facility-address-form>
  </form>`
})
export class FacilityFormComponent {
  @Input() vm!: Facility;

  @ViewChild('facilityForm') form?: NgForm;

  ngAfterViewInit() {
    this.form?.valueChanges?.subscribe(x => console.log(x));
  }
}