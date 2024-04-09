import { Injectable, inject } from "@angular/core";
import { Observable, filter, map, take } from "rxjs";
import { Facility } from "../models/facility.model";
import { deepClone } from "@app/shared/core";
import { DataService } from "./fake-data.service";

@Injectable({ providedIn: 'root' })
export class FacilityViewService {
    private readonly dataService = inject(DataService);

    facility$ = this.dataService.facility$;

    /** Build the CompanyVm for the current Company
     * @returns a terminating observable of a VM for that Company if it exists
     * else terminating observable of null.
    */
    getCompanyVm(): Observable<Facility | null> {
        return this.dataService.facility$.pipe(
            filter(co => co != null),
            take(1),
            map(co => deepClone(co))
        );
    }

    /** Save Company changes in the ViewModel, if there are any */
    saveCompanyVm(vm: Facility | null): Observable<boolean> | boolean {
        return true;
    }
}
