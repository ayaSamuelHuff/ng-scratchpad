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
                title: 'Template + Framework | New',
                component: FacilityTemplatePageComponent,
            },
            {
                path: ':id',
                title: 'Template + Framework | Edit',
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
                title: 'Vanilla | New',
                component: NewFacilityPageVanillaComponent,
            },
            {
                path: ':id',
                title: 'Vanilla | Edit',
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
                title: 'Reactive | New',
                component: FacilityReactiveFormComponent,
            },
            {
                path: ':id',
                title: 'Reactive | Edit',
                component: FacilityReactiveFormComponent,
                resolve: {
                    facility: resolveFacility
                }
            }
        ]
    },
];
