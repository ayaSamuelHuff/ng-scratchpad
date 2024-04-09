import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input-error',
  standalone: true,
  imports: [CommonModule],

  template: `
    @if (show) {
    <div class="full-width">
      @if (error) {
        <span class="error">{{ error }}</span>
      }
      @if (pending) {
        <span class="pending">validating...</span>
      }
    </div>
    }
  `,
})
export class InputErrorComponent implements OnDestroy, OnInit {
  @Input() control?: Partial<FormControl>

  error?: ValidationErrors | null;
  pending = false;

  private sub?: Subscription;
  get show() {
    return !!this.control?.touched;
  }

  ngOnInit(): void {
    if (this.control) {
      const control = this.control;
      this.sub = control.statusChanges!.subscribe(changes => {
        this.error = null;
        this.pending = false;
        if (changes === 'INVALID') {
          this.error = control.errors ? control.errors!['error'] : null;
        } else {
          this.pending = changes === 'PENDING';
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
