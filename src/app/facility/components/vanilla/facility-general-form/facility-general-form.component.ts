import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Facility } from '@app/facility/models/facility.model';
import { ForbiddenNameValidatorDirective } from '@app/facility/validators/forbidden-name.validator';

@Component({
  selector: 'app-facility-general-form',
  standalone: true,
  imports: [MatInputModule, FormsModule, CommonModule, ForbiddenNameValidatorDirective],
  template: `
    <mat-form-field class="col full-width">
      <input  matInput placeholder="Name" type="text" name="name" [(ngModel)]="vm.name" forbiddenName required #name="ngModel" maxlength="50" minlength="3">
      <mat-error class="full-width" *ngIf="name.control.hasError('required')">Required</mat-error>
      <mat-error class="full-width" *ngIf="name.control.hasError('maxlength')">Name must be less than 50 characters</mat-error>
      <mat-error class="full-width" *ngIf="name.control.hasError('minlength')">Name must be at least 3 characters</mat-error>
      <mat-error class="full-width" *ngIf="name.control.hasError('forbiddenName')">Sorry, Elmo isn't allowed</mat-error>
    </mat-form-field>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class FacilityGeneralFormComponent {
  @ViewChild('name') input: any;

  @Input() vm!: Facility;
}
