import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FacilityAddress } from '@app/facility/models/facility-address.model';
import { UsStates } from '@app/facility/models/us-states';



@Component({
  selector: 'app-facility-address-form',
  standalone: true,
  imports: [MatInputModule, FormsModule, CommonModule],
  template: `<div class="row">
    <mat-form-field class="col full-width">
      <input matInput placeholder="Street" type="text" name="street" [(ngModel)]="vm.street" required #street="ngModel">
      <mat-error class="full-width" *ngIf="street.control.hasError('required')">Required</mat-error>
    </mat-form-field>
  </div>
  <div class="row">
    <mat-form-field class="col full-width">
      <input matInput placeholder="City" type="text" name="city" [(ngModel)]="vm.city" required #city="ngModel">
      <mat-error class="full-width" *ngIf="city.control.hasError('required')">Required</mat-error>
    </mat-form-field>

    <mat-form-field class="col full-width">
      <select matNativeControl [(ngModel)]="vm.stateId" #state="ngModel">
        @for (state of states; track state.abbreviation) {
          <option [value]="state.abbreviation">{{ state.name }}</option>
        }
      </select>
      <mat-error class="full-width" *ngIf="state.control.hasError('required')">Required</mat-error>
    </mat-form-field>
  </div>
  
 
  <div class="row">
    <mat-form-field class="col full-width">
      <input matInput placeholder="ZIP Code" type="text" name="zip" [(ngModel)]="vm.zip" required #zip="ngModel">
      <mat-error class="full-width" *ngIf="zip.control.hasError('required')">Required</mat-error>
    </mat-form-field>
  </div>`
})
export class FacilityAddressFormComponent {
  @Input() vm!: FacilityAddress;

  states = UsStates;
}
