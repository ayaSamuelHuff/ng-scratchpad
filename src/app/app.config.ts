import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FacilityViewService } from './facility/service/facility-view.service';
import { validationSuiteProviders } from './facility/validators/validation-suites';
import { DataService } from './facility/service/fake-data.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), FacilityViewService, validationSuiteProviders, DataService, provideAnimationsAsync()]
};
