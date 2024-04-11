import { Component, OnInit, inject } from '@angular/core';
import { FacilityFormComponent } from "../facility-form/facility-form.component";
import { Facility } from '@app/facility/models/facility.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, startWith, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facility-page',
  standalone: true,
  template: `
  <h2>Template + Framework</h2>
  @if (vm$ | async; as vm) {
    <app-facility-form [vm]="vm"></app-facility-form>
  }`,
  imports: [FacilityFormComponent, CommonModule]
})
export class FacilityPageComponent {
  private activatedRoute = inject(ActivatedRoute);

  vm$: Observable<Partial<Facility>> = this.activatedRoute.data.pipe(
    filter(x => x['facility']),
    map(x => x['facility']),
    startWith({}));
}
