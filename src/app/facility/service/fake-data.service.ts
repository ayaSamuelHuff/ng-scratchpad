import { Observable, of } from "rxjs";
import { Facility } from "../models/facility.model";

export class DataService {
    facility$: Observable<Facility> = of({
        name: 'The White House',
        address: {
            street: '1600 Pennsylvania Ave.',
            city: 'Washington',
            zip: '20500',
            stateId: 'DC'
        }
    })
}