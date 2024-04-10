import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Facility } from '@app/facility/models/facility.model';

@Component({
  selector: 'app-facility-general-form',
  standalone: true,
  imports: [MatInputModule, FormsModule, CommonModule],
  template: `
    <mat-form-field class="col full-width">
      <input  matInput placeholder="Name" type="text" name="name" [(ngModel)]="vm.name" required #name="ngModel">
      <mat-error class="full-width" *ngIf="name.control.hasError('required')">Required</mat-error>
    </mat-form-field>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class FacilityGeneralFormComponent {
  @ViewChild('name') input: any;

  @Input() vm!: Facility;
}
