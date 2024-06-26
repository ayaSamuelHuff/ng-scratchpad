import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
    `,
  styleUrl: './app.component.scss',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'ng-scratchpad';
}
