import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacilityFormComponent } from "./facility/components/template/facility-form/facility-form.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FacilityFormComponent]
})
export class AppComponent {
  title = 'ng-scratchpad';
}
