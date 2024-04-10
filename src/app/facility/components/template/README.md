# Template forms (with wrapper)

These components use a small library to merge standard template forms (seen in "vanilla") with validation suites. All concepts of the traditional template forms work as before, but the addition of this library simplifies the template code significantly AND allows for name-based validation without validators on the inputs themselves.

## Standardized Forms
The first enhancement this provides is a way to standardize the look and feel of the forms. Since everything should (ideally) rely on `input-text` and its friends so every form gets built with the same UI/UX principles.

It is possible to implement custom inputs and bind to the same template mapping, so we are not limited to the current `input` and `select` components only.

See: [base input](../../../shared/widgets/input-base.component.ts)

## Simplified Templates
This is a knock-on effect of the standardized forms improvement. Since we rely on common input components, we get a lot less code in the actual templates. For example:

**Vanilla**
```html
<div class="row">
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
  </div>
```

vs.

**Wrapped**
```html
<div [ngModelGroup]="ngModelGroupName" [model]="vm" modelType="address">
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
</div>
```

Both these templates render a small form with 3 text fields and a single dropdown.

## Validation
The final, and arguably best, improvement is the way validations are done with this wrapper. Instead of manually adding validators via the component or validator directives in the template, validators are written in fully separated validation "suites" that are bound to the model by name.

This separates the concerns of the form (presenting and receiving data) from the concern of model validation. The validators are injected with a token and the `FormFieldNgModelDirective` directive retrieves the proper validations from the injector and binds them to the controls.

See: [validators](../../validators/validation-suites.ts), [binding directive](../../../shared/validation/form-field-ng-model.directive.ts), and [error mapping](../../../shared/validation/validation-fns.ts)