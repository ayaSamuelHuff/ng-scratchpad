import { inject } from "@angular/core"
import { FacilityViewService } from "../service/facility-view.service"
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { Facility } from "../models/facility.model";

export const resolveFacility = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Facility> => {
    const service = inject(FacilityViewService);

    return service.facility$.pipe(tap(x => console.log('resolveFacility', x)))
}