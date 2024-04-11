import { Component, OnDestroy, inject } from '@angular/core';
import { Subject, filter, map, of, startWith, takeUntil } from 'rxjs';
import { FacilityFormComponent } from '../facility-form/facility-form.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-facility-vanilla-page',
  standalone: true,
  imports: [FacilityFormComponent, CommonModule],
  template: `
  <h2>Template</h2>
  <app-facility-vanilla-form [vm]="(vm$ | async)!"></app-facility-vanilla-form>
  `
})
export class FacilityPageComponent implements OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly _destroying$ = new Subject<void>();

  vm$ = this.activatedRoute.data.pipe(
    takeUntil(this._destroying$),
    filter((d) => d['facility']),
    map((d) => d['facility']),
    startWith({ name: '', address: { street: '', city: '', stateId: '', zip: '' } })
  );

  ngOnDestroy(): void {
      this._destroying$.next();
      this._destroying$.complete();
  }
}
