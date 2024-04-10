import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FacilityFormComponent } from '../facility-form/facility-form.component';
import { CommonModule } from '@angular/common';
import { Facility } from '@app/facility/models/facility.model';

@Component({
  selector: 'app-new-facility-vanilla-page',
  standalone: true,
  imports: [FacilityFormComponent, CommonModule],
  template: `
  <app-facility-vanilla-form [vm]="(vm$ | async)!"></app-facility-vanilla-form>
  `
})
export class NewFacilityPageComponent {
  vm$ = of({address: {}} as Facility);
}
