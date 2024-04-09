import { Component } from '@angular/core';
import { FacilityFormComponent } from '../facility-form/facility-form.component';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Facility } from '@app/facility/models/facility.model';

@Component({
  selector: 'app-new-facility-page',
  standalone: true,
  imports: [FacilityFormComponent, CommonModule],
  template: `
  @if (vm$ | async; as vm) {
    <app-facility-form [vm]="vm"></app-facility-form>
  }`,
})
export class NewFacilityPageComponent {
  vm$: Observable<Partial<Facility>> = of({})
}
