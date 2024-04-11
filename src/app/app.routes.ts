import { Routes } from '@angular/router';
import { resolveFacility } from './facility/resolvers/facility.resolver';
import { FacilityPageComponent as NewFacilityPageVanillaComponent } from './facility/components/vanilla/facility-page/facility-page.component';
import { FacilityReactiveFormComponent } from './facility/components/reactive';
import { FacilityTemplatePageComponent } from './facility/components/template';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'facility',
    },
    {
        path: 'facility',
        children: [
            {
                path: '',
                component: FacilityTemplatePageComponent,
            },
            {
                path: ':id',
                component: FacilityTemplatePageComponent,
                resolve: {
                    facility: resolveFacility
                }
            }
        ]
    },
    {
        path: 'vanilla/facility',
        children: [
            {
                path: '',
                component: NewFacilityPageVanillaComponent,
            },
            {
                path: ':id',
                component: NewFacilityPageVanillaComponent,
                resolve: {
                    facility: resolveFacility
                }
            }
        ]
    },
    {
        path: 'reactive/facility',
        children: [
            {
                path: '',
                component: FacilityReactiveFormComponent,
            },
            {
                path: ':id',
                component: FacilityReactiveFormComponent,
                resolve: {
                    facility: resolveFacility
                }
            }
        ]
    },
];
