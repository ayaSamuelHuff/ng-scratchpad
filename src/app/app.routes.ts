import { Routes } from '@angular/router';
import { resolveFacility } from './facility/resolvers/facility.resolver';
import { FacilityPageComponent } from './facility/components/template/facility-page/facility-page.component';
import { NewFacilityPageComponent } from './facility/components/template/new-facility-page/new-facility-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'facility',
    },
    {
        path: 'facility',
        component: NewFacilityPageComponent,
    },
    {
        path: 'facility/:id',
        component: FacilityPageComponent,
        resolve: {
            facility: resolveFacility
        }
    }
];
