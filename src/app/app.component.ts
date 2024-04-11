import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacilityFormComponent } from "./facility/components/template/facility-form/facility-form.component";
import { FacilityReactiveFormComponent } from './facility/components/reactive';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FacilityFormComponent, FacilityReactiveFormComponent]
})
export class AppComponent {
  title = 'ng-scratchpad';
}
