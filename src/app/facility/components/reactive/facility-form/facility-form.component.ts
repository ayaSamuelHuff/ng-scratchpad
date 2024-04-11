import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Facility } from '@app/facility/models/facility.model';
import { UsStates } from '@app/facility/models/us-states';
import { facilityNameValidator } from '@app/facility/validators/facility.async-validations';
import { FORMS } from '@app/shared/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';  

@Component({
  selector: 'app-facility-template-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FORMS],
  template: `
  <h2>Reactive</h2>
  <form [formGroup]="form">
    <mat-form-field class="col full-width">
      <input  matInput placeholder="Name" type="text" formControlName="name">
      <mat-error class="full-width" *ngIf="name.hasError('required')">Required</mat-error>
      <mat-error class="full-width" *ngIf="name.hasError('maxlength')">Name must be less than 50 characters</mat-error>
      <mat-error class="full-width" *ngIf="name.hasError('minlength')">Name must be at least 3 characters</mat-error>
      <mat-error class="full-width" *ngIf="name.hasError('forbiddenName')">Sorry, Elmo isn't allowed</mat-error>
    </mat-form-field>
    <div formGroupName="address">
      <div class="row">
        <mat-form-field class="col full-width">
          <input matInput placeholder="Street" type="text" formControlName="street">
          <mat-error class="full-width" *ngIf="street.hasError('required')">Required</mat-error>
        </mat-form-field>
      </div>
      <div class="row">
        <mat-form-field class="col full-width">
          <input matInput placeholder="City" type="text" formControlName="city">
          <mat-error class="full-width" *ngIf="city.hasError('required')">Required</mat-error>
        </mat-form-field>
        <mat-form-field class="col full-width">
          <select matNativeControl formControlName="state">
            @for (state of states; track state.abbreviation) {
              <option [value]="state.abbreviation">{{ state.name }}</option>
            }
          </select>
          <mat-error class="full-width" *ngIf="state.hasError('required')">Required</mat-error>
        </mat-form-field>
      </div>
      <div class="row">
        <mat-form-field class="col full-width">
          <input matInput placeholder="ZIP Code" type="text" formControlName="zip">
          <mat-error class="full-width" *ngIf="zip.hasError('required')">Required</mat-error>
        </mat-form-field>
      </div>
    </div>
  </form>`,
})
export class FacilityFormComponent implements OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  // These getters are all sugar for the template. We _could_ write "form.controls.name.hasError('required')", but that really clutters up the template.
  get name() {
    return this.form.controls.name;
  }

  get address() {
    return this.form.get('address')!;
  }

  get street() {
    return this.address.get('street')!;
  }

  get city() {
    return this.address.get('city')!;
  }

  get state() {
    return this.address.get('state')!;
  }

  get zip() {
    return this.address.get('zip')!;
  }

  states = UsStates;

  private readonly _destroying$ = new Subject<void>();

  // This is requried for reactive forms. But we also defined the form in the template. This is an extra step with data 
  // that needs to match the template in order for the form to work. Plus this also needs to match any models we 
  // patch the data with, or we need to build an adapter to transform the model to fit the form data structure.
  form = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)], [
      facilityNameValidator(),
    ]),
    address: this.formBuilder.group({
      street: this.formBuilder.control('', [Validators.required]),
      city: this.formBuilder.control('', [Validators.required]),
      state: this.formBuilder.control('', [Validators.required]),
      zip: this.formBuilder.control('', [Validators.required]),
    }),
  });

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      distinctUntilChanged(),
      takeUntil(this._destroying$)
    )
      .subscribe((data) => {
        const facility = data['facility'] as Facility;
        // This won't work unless the form and the model have the same structure.
        this.form.patchValue(facility);
      });
  }
}